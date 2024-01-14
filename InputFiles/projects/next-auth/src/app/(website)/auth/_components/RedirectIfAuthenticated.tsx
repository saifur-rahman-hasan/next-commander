import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {redirect} from "next/navigation";

interface RedirectIfAuthenticatedProps {
	children?: React.ReactNode,
	redirectTo?: string
}
export default async function RedirectIfAuthenticated({children, redirectTo = '/home'} : RedirectIfAuthenticatedProps){
	const session = await getServerSession(authOptions)
	const user: any = session?.user

	if(user){
		return redirect(redirectTo)
	}

	return <>{children}</>
}