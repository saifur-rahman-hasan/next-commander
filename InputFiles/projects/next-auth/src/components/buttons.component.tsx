"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import IconButton from "@mui/joy/IconButton";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import * as React from "react";

export const LoginButton = ({ className }: {className?: string}) => {
    return (
        <button className={className} onClick={() => signIn()}>
            Log in <span aria-hidden="true">&rarr;</span>
        </button>
    );
};

export const RegisterButton = ({ className }: {className?: string}) => {
    return (
        <Link
            className={className}
            href={'/auth/register'}
        >
            Register
        </Link>
    );
};

export const LogoutButton = ({ className }: {className?: string}) => {
    return (
        <button
            className={className}
            onClick={() => signOut({ callbackUrl: '/auth/login'})}>
            Log Out
        </button>
    );
};

export const DashboardLogoutIconButton =  () => {
    return (
        <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={() => signOut({ callbackUrl: '/auth/login'})}
        >
            <LogoutRoundedIcon />
        </IconButton>
    )
}

export const ProfileButton = ({ className }: {className?: string}) => {
    return <Link
        className={className}
        href="/profile">Profile</Link>
};
