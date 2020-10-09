import {User} from "./user";

export interface UserResponse {
	list: User[],
	total: number,
}
