"use client";

import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';
import {Session} from "next-auth";

type Props = {
  children?: React.ReactNode;
  session: Session | null
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <>
    <SessionProvider
        session={session}
        // Re-fetch session every 5 minutes
        refetchInterval={5 * 60}

        // Re-fetches session when window is focused
        refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  </>
};
