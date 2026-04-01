import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import { DefaultSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: unknown;
    promise: unknown;
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      fdlst_private_userId: string;
    } & DefaultSession["user"];
  }
}

const createUserId = (originalString: string) => {
  return createHash("sha256").update(originalString).digest("hex");
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      }),
    ],

    callbacks: {
      async jwt({ token }) {
        return token;
      },
      async session({ session }) {
        if (session.user.email && !session.user.fdlst_private_userId) {
          session.user.fdlst_private_userId = createUserId(session.user.email);
        }
        return session;
      },
    },
  });
}

export default handler;
