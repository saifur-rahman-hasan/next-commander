interface ServiceUpdateInterface {
	name: string;
	email: string;
	domain: string;
	ip: string;
	dsid: string;
}

interface ServiceReadInterface extends ServiceUpdateInterface {
	id: string;
	uuid: string;
}

interface ServiceCreateInterface extends ServiceUpdateInterface {
	uuid: string;
}
