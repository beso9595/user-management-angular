import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user/user";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

	user: User;

	activatedRouteSub: Subscription;

	constructor(private headerService: HeaderService,
				private activatedRoute: ActivatedRoute,
				private router: Router,
				private userService: UserService) {
		this.headerService.updateHeader({
			title: 'User Setup',
			showSearch: false,
			showButton: true,
			disableButton: true,
			buttonIcon: 'settings'
		});
		//
		this.activatedRouteSub = this.activatedRoute.params.subscribe(params => {
			if (params && params.id) {
				const user = this.userService.getUserById(parseInt(params.id, 10));
				if (user) {
					this.user = user;
					return;
				}
			}
			this.router.navigateByUrl('users');
		});
	}

	ngOnInit(): void {
	}

	onUserStatusChange(): void {
		this.user.isActive = !this.user.isActive;
	}

	ngOnDestroy(): void {
		this.activatedRouteSub.unsubscribe();
	}

}
