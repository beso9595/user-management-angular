import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {User} from "../models/user/user";

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	private confirmUserDeleteModalSource = new Subject<number>();
	private confirmUserInviteModalSource = new Subject<User>();

	confirmUserDeleteModal$ = this.confirmUserDeleteModalSource.asObservable();
	confirmUserInviteModal$ = this.confirmUserInviteModalSource.asObservable();

	confirmUserDeleteModal(userId: number) {
		this.confirmUserDeleteModalSource.next(userId);
	}

	confirmUserInviteModal(user: User) {
		this.confirmUserInviteModalSource.next(user);
	}

	constructor() {
	}
}
