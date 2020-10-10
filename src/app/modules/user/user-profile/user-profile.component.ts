import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

	user: User;
	userForm: FormGroup;

	activatedRouteSub: Subscription;

	constructor(private headerService: HeaderService,
				private activatedRoute: ActivatedRoute,
				private router: Router,
				public userService: UserService) {
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
					this.user = {
						...user
					};
					this.init();
					return;
				}
			}
			this.router.navigateByUrl('users');
		});
	}

	ngOnInit(): void {
	}

	init(): void {
		this.userForm = new FormGroup({
			firstName: new FormControl(this.user.firstName, [Validators.required]),
			lastName: new FormControl(this.user.lastName, [Validators.required]),
			roleId: new FormControl(this.user.roleId, [Validators.required]),
		});
	}

	onUserStatusChange(): void {
		this.userService.updateUserStatus(this.user.id, !this.user.isActive);
		this.user.isActive = !this.user.isActive;
	}

	onSaveUserChangesClick(): void {

	}

	onPermissionStatusChange(permissionId: number): void {

	}

	onPermissionGroupStatusChange(permissionGroupId: number): void {

	}

	ngOnDestroy(): void {
		this.activatedRouteSub.unsubscribe();
	}

}
