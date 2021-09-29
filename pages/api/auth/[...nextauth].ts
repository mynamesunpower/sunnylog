import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/database-util';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    //
    // 내 커스텀 credentials
    Providers.Credentials({
      async authorize(credentials: any) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error('No User Found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          client.close();
          throw new Error('Could not log you in..');
        }

        client.close();
        return { email: user.email }; // jwt 에 넣을 정보 추가해서 뱉어냄
      },
    }),
  ],
});
