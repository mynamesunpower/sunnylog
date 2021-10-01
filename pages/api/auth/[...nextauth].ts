import NextAuth, { Profile, TokenSet } from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/database-util';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  pages: {
    signIn: '/auth',
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 10 * 60,
  },
  jwt: {},
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // TODO 네이버는 세션에 정보가 안담기고 있음
    Providers.Kakao({
      type: 'oauth',
      scope: 'account_email profile_nickname profile_image',
      clientId: process.env.KAKAO_CLIENT_SECRET,
      profile: (profile: any) => {
        return {
          id: profile.id,
          name: profile.properties.nickname,
          email: profile.kakao_account.email,
          image: profile.kakao_account.profile.thumbnail_image_url,
        };
      },
    }),
    Providers.Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      // id: 'naver',
      // name: 'Naver',
      // type: 'oauth',
      // version: '2.0',
      // params: { grant_type: 'authorization_code' },
      // protection: 'state',
      // accessTokenUrl: 'https://nid.naver.com/oauth2.0/token',
      // authorizationUrl:
      //   'https://nid.naver.com/oauth2.0/authorize?response_type=code',
      // profileUrl: 'https://openapi.naver.com/v1/nid/me',
      profile: (profile: any, tokens: TokenSet) => {
        console.log(profile);
        console.log(tokens);
        return {
          ...profile.response,
          id: profile.response.id,
        };
      },
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
