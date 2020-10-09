import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {Subscription} from "rxjs";
import {User} from "../../../models/user/user";
import {UserService} from "../../../services/user.service";
import {Sort} from "../../../models/sort";
import {UserResponse} from "../../../models/user/user-response";

@Component({
	selector: 'app-users-view',
	templateUrl: './users-view.component.html',
	styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit, OnDestroy {

	userList: User[];
	total: number = 0;

	pageSize: number = 5;
	page: number = 1;
	sort: Sort;
	searchWord: string;

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
			this.searchWord = searchWord;
			this.page = 1;
			this.loadUsers();
		});
		this.buttonClickSub = this.headerService.buttonClick$.subscribe(() => {
			console.log('button click');
		});
		//
		this.loadUsers();
	}

	ngOnInit(): void {
	}

	loadUsers(): void {
		const response: UserResponse = this.userService.getUsers(this.pageSize, this.sort, this.page, this.searchWord);
		this.userList = response.list;
		this.total = response.total;
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

	onPageSizeChange(): void {
		this.page = 1;
		this.loadUsers();
	}

	getPageArray(): number[] {
		const pages = [];
		for (let i = 1; i <= this.getTotalPages(); i++) {
			pages.push(i);
		}
		return pages;
	}

	onPreviousPageClick(): void {
		if (this.page !== 1) {
			this.page--;
			this.loadUsers();
		}
	}

	onPageClick(page: number): void {
		if (this.page !== page) {
			this.page = page;
			this.loadUsers();
		}
	}

	onNextPageClick(): void {
		if (this.page !== this.getTotalPages()) {
			this.page++;
			this.loadUsers();
		}
	}

	getTotalPages(): number {
		return Math.ceil(this.total / this.pageSize);
	}

	ngOnDestroy(): void {
		this.searchWordChangeSub.unsubscribe();
		this.buttonClickSub.unsubscribe();
	}

}
