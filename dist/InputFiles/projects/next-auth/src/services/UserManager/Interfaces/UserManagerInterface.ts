export interface UserCreateInterface {
	"name": string,
	"email": string,
	"emailVerified"?: Date,
	"userVerified"?: boolean,
	"image"?: string,
	"password"?: string
}

export interface UserReadInterface extends UserCreateInterface{
	"id": string,
	"createdAt"?: Date
	"updatedAt"?: Date
}

export interface UserUpdateInterface {
	"name"?: string,
	"email"?: string,
	"updatedAt"?: Date
}

export interface UserPasswordUpdateInputInterface {
	"password"?: string,
	"new_password"?: string,
	"new_password_confirmation"?: string,
}
