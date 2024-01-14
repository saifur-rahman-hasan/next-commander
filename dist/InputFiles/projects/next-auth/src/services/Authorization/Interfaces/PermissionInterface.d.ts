export interface PermissionCreateInterface {
	name: string;
}

export interface PermissionReadInterface extends PermissionCreateInterface {
	id: number;
	createdAt?: Date;
	updatedAt?: Date;
}
