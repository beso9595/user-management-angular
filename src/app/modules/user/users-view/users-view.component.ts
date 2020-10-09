import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {Subscription} from "rxjs";
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user.service";

@Component({
	selector: 'app-users-view',
	templateUrl: './users-view.component.html',
	styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit, OnDestroy {

	userList: User[];

	searchWordChangeSub: Subscription;
	buttonClickSub: Subscription;

	constructor(private headerService: HeaderService,
				public userService: UserService) {
		this.headerService.updateHeader({
			title: 'Project Access',
			showSearch: true,
			showButton: true,
			buttonIcon: 'add'
		});
		//
		this.searchWordChangeSub = this.headerService.searchWordChange$.subscribe((searchWord: string) => {
			console.log(searchWord);
		});
		this.buttonClickSub = this.headerService.buttonClick$.subscribe(() => {
			console.log('button click');
		});
		//
		this.userList = this.userService.getUsers(5, null, 1, null);
	}

	ngOnInit(): void {
	}

	trackByFn(index: number, item: User): any {
		return item.id;
	}

	onUserStatusClick(user: User): void {
		user.isActive = !user.isActive;
	}

	onOpenUserProfileClick(userId: number): void {

	}

	onDeleteUserClick(user: User): void {

	}

	ngOnDestroy(): void {
		this.searchWordChangeSub.unsubscribe();
		this.buttonClickSub.unsubscribe();
	}

}
