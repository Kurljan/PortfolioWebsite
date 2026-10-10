import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/gmail.send"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // ONLY allow the specific OWNER_EMAIL
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
      (session as any).accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: "/owl/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
