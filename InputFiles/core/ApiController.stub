import {NextRequest, NextResponse} from "next/server";

export abstract class ApiController {
	protected request: NextRequest
	protected response: NextResponse
	protected requestSearchParams: any;

	protected constructor(
		req: NextRequest,
		res: NextResponse
	) {
		this.request = req
		this.response = res



		this.requestSearchParams = this.getSearchParams()
	}

	async getReqBody() {
		return await this.request.json()
	}

	async getReqData() {

		if(this.request.method === 'GET'){
			const hasSearchParams = Object.keys(this.requestSearchParams).length > 0
			return hasSearchParams ? {...this.requestSearchParams} : {}
		}

		if(this.request.method === 'POST'){
			const reqBody = await this.getReqBody()
			return Object.keys(reqBody).length > 0 ? {...reqBody} : {}
		}
	}

	validateRequest() {

	}

	private getSearchParams() {
		let searchParams: { [key: string]: string } = {};

		if(this.request.method === 'GET'){
			const currentUrl = this.request.nextUrl.toString()

			const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
			urlParams.forEach((value, key) => {
				searchParams[key] = value;
			});
		}

		return searchParams
	}
}

export interface ApiCrudController {
	index(): any;
	create(): any;
	show(id: any): any;
	update(id: any): any;
	delete(id: any): any;
}
