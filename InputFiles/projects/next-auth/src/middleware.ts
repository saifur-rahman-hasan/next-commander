export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/auth/callbacks/signInSuccess",
		"/auth/callbacks/signUpSuccess",
		"/home/:path*",
		"/profile/:path*",
		"/settings/:path*",
		"/dashboard/:path*",
		"/api/auth/user"
	]
};