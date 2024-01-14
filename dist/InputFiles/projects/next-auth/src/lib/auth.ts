import Env from "@/config/Env";
import axios from "@/lib/axios";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type {NextAuthOptions, Profile} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";
import {hash} from "bcryptjs";

export const authOptions: NextAuthOptions = {
  debug: true,

  secret: Env.get("NEXTAUTH_SECRET"),

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  useSecureCookies: false, // using false while local development

  adapter: PrismaAdapter(prisma as any),

  pages: {
    signIn: "/auth/login",
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.emailVerified,
        }
      },
      allowDangerousEmailAccountLinking: true
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          // TODO: Get user access token using user given credentials
          const accessToken = await axios
            .post("/auth/token", credentials)
            .then((res) => res.data.data.accessToken);

          if (!accessToken) {
            return null;
          }

          // TODO: Get User information using the received access Token

          const user = await axios
            .get("/auth/user", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => res?.data?.data);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            accessToken: accessToken,
          };
        } catch (e: any) {
          // console.log('failed to login', e)
          return null;
        }
      },
    }),
  ],

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      const signedInUser: any = user;

      // Only for Credentials Provider
      if (
        account?.provider === "credentials" &&
        signedInUser?.accessToken !== undefined
      ) {
        return true;
      }

      // Only for Google Provider
      if (account?.provider === "google" &&
        account.providerAccountId &&
        account?.access_token
      ) {
        return true;
      }

      return false;
    },
    jwt: ({ token, user, account, profile }) => {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account?.access_token || account?.accessToken;
      }

      if (user) {
        const u = user as unknown as any;

        return {
          ...token,
          id: u.id,
          accessToken: u.accessToken,
        };
      }

      return token;
    },
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        },
      };
    },
  },

  // logger: {
  //   error(code, metadata) {
  //     // eslint-disable-next-line no-console
  //     console.log("authError", { code, metadata });
  //   },
  // },
};
