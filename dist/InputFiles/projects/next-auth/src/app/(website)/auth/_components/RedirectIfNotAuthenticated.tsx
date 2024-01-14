import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";

interface RedirectIfNotAuthenticatedProps {
	children?: React.ReactNode,
	redirectTo?: string
}
export default async function RedirectIfNotAuthenticated({children, redirectTo = '/auth/login'} : RedirectIfNotAuthenticatedProps){
	const session = await getServerSession(authOptions)
	const user: any = session?.user

	if(!user){
		return redirect(redirectTo)
	}

	return <>{children}</>
}