export default class Env {
	private readonly NEXTAUTH_URL: string = process.env.NEXTAUTH_URL || "MY_NEXTAUTH_URL";
	private readonly NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET || "MY_NEXTAUTH_SECRET";
	private readonly AUTH_SERVICE_USE_SECURE_COOKIES: boolean = Boolean(process.env.AUTH_SERVICE_USE_SECURE_COOKIES!) || false;

	public static init(){
		return this
	}

	public static get(key: string) {
		const dataType = typeof key
		if(dataType === 'boolean'){
			// @ts-ignore
			return this[key] || false;
		}else{
			// @ts-ignore
			return this[key] || null;
		}
	}
}
