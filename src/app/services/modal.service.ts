import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ModalService {

	private confirmModalSource = new Subject<number>();

	confirmModal$ = this.confirmModalSource.asObservable();

	confirmModal(userId: number) {
		this.confirmModalSource.next(userId);
	}

	constructor() {
	}
}
