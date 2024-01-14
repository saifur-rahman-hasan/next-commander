import BaseAction from "@/services/UserManager/Actions/BaseAction";
import {UserCreateInterface, UserReadInterface} from "@/services/UserManager/Interfaces/UserManagerInterface";
import UserRepository from "@/services/UserManager/Repositories/UserRepository";

export default class UserCreateAction extends BaseAction {
	private userRepository: UserRepository;

	constructor() {
		super();

		this.userRepository = new UserRepository()
	}

	async execute(data: UserCreateInterface): Promise<UserReadInterface> {
		try {

			const newUser = await this.userRepository.create(data)

			return Promise.resolve(newUser)

		}catch (e: any) {
			console.log('UserCreateAction Error: ', e.message)
			return Promise.reject(e.message)
		}
	}

}