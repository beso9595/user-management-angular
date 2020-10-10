import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RolePermission} from "../../../models/user/role-permission";
import {Permission} from "../../../models/user/permission";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

	user: User;
	userForm: FormGroup;

	activatedRouteSub: Subscription;
	userFormRoleIdChangeSub: Subscription;

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
				const user = this.userService.getUserById(+params.id);
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
		this.userFormRoleIdChangeSub = this.userForm.get('roleId').valueChanges.subscribe(() => {
			this.user.customPermissionList = [];
		});
	}

	onUserStatusChange(isActive: boolean): void {
		this.userService.updateUserStatus(this.user.id, isActive);
		this.user.isActive = isActive;
	}

	hasError(fieldName: string): boolean {
		return (this.userForm.get(fieldName).touched || this.userForm.get(fieldName).dirty) && !this.userForm.get(fieldName).valid;
	}

	onSaveUserChangesClick(): void {
		this.user = this.userService.updateUser({
			...this.user,
			firstName: this.userForm.get('firstName').value,
			lastName: this.userForm.get('lastName').value,
			roleId: +this.userForm.get('roleId').value,
		});
		this.router.navigateByUrl('users');
	}

	onPermissionStatusChange(permissionId: number, isActive: boolean): void {
		if (this.user.customPermissionList && this.user.customPermissionList.length > 0) {
			const customPerm: RolePermission = this.user.customPermissionList.find(rp => rp.permissionId === permissionId);
			if (customPerm) {
				customPerm.isActive = isActive;
			} else {
				this.user.customPermissionList.push({
					roleId: +this.userForm.get('roleId').value,
					permissionId,
					isActive
				});
			}
		} else {
			this.user.customPermissionList = [
				{
					roleId: +this.userForm.get('roleId').value,
					permissionId,
					isActive
				}
			];
		}
	}

	onPermissionGroupStatusChange(permissionGroupId: number, isActive: boolean): void {
		const groupPermissionList: Permission[] = this.userService.getPermissions().filter(p => p.permissionGroupId === permissionGroupId);
		const groupPermissionIds: number[] = groupPermissionList.map(p => p.id);
		this.user.customPermissionList = (this.user.customPermissionList || []).filter(rp => !groupPermissionIds.includes(rp.permissionId));

		groupPermissionIds.forEach(pId => {
			this.user.customPermissionList.push({
				roleId: +this.userForm.get('roleId').value,
				permissionId: pId,
				isActive,
			});
		});
	}

	ngOnDestroy(): void {
		this.activatedRouteSub.unsubscribe();
		this.userFormRoleIdChangeSub.unsubscribe();
	}

}
