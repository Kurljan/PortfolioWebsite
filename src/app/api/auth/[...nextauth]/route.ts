import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validUsername = process.env.OWNER_USERNAME ?? "";
        const validPassword = process.env.OWNER_PASSWORD ?? "";

        if (
          credentials?.username === validUsername &&
          credentials?.password === validPassword &&
          validUsername !== ""
        ) {
          return {
            id: "1",
            name: validUsername,
            email: process.env.OWNER_EMAIL ?? "",
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.send"
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") return true;
      // ONLY allow the specific OWNER_EMAIL for Google provider
      const ownerEmail = process.env.OWNER_EMAIL;
      if (ownerEmail && user.email === ownerEmail) {
        return true;
      }
      return false; // Reject everyone else
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Store encrypted securely
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  },
  pages: {
    signIn: "/owl/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = NextAuth(authOptions) as any;
export { handler as GET, handler as POST };
