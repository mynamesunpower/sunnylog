import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/database-util';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  pages: {
    signIn: '/auth',
  },
  session: {
    jwt: true,
    maxAge: 10 * 60,
    updateAge: 60,
  },
  providers: [
    Providers.Kakao({
      clientId: process.env.KAKAO_CLIENT_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Providers.Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    // 직접 로그인
    Providers.Credentials({
      async authorize(credentials: { email: string; password: string }) {
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
