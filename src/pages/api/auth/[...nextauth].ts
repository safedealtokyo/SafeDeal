import { utils } from "ethers";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials: any) {
        const address = credentials?.address;
        if (!Boolean(utils.getAddress(address))) {
          return null;
        }
        return {
          id: address,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async session({ session, token }) {
      (session as any).address = token.sub;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    newUser: "/",
  },
});
