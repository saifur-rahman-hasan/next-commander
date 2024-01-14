import "next-auth";

declare module "next-auth" {
	interface User {
		userType?: string | null;
		profileStatus?: boolean;
		randomKey?: string;
	}
	interface Session {
		role?: string;
		user?: User;
		session?: any;
	}
}
