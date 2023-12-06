import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const GOOGLE_CLIENT_ID =
  '800597215276-tqiij4eankopu4dim0n5f2tcqbeqdivf.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export default handler;
