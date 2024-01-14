export interface RoleCreateInterface {
	name: string
}

export interface RoleReadInterface extends RoleCreateInterface{
	id: number,
	createdAt?: Date
	updatedAt?: Date
}