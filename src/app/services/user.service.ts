import {Injectable} from '@angular/core';
import {User} from "../models/user/user";
import {Sort} from "../models/sort";
import {Role} from "../models/user/role";
import {UserResponse} from "../models/user/user-response";
import {Permission} from "../models/user/permission";
import {PermissionGroup} from "../models/user/permission-group";
import {RolePermission} from "../models/user/role-permission";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private roleList: Role[] = [
		{
			id: 1,
			name: 'Admin'
		},
		{
			id: 2,
			name: 'User'
		}
	];
	private userList: User[] = [
		{
			id: 1,
			firstName: 'Danniel',
			lastName: 'Blichman',
			email: 'danniel.blichman@test.com',
			isActive: true,
			roleId: 1,
			customPermissionList: [
				{roleId: 1, permissionId: 1, isActive: true},
				{roleId: 1, permissionId: 2, isActive: true},
				{roleId: 1, permissionId: 3, isActive: true},
				{roleId: 1, permissionId: 4, isActive: true},

				{roleId: 1, permissionId: 6, isActive: true},
				{roleId: 1, permissionId: 7, isActive: true},

				{roleId: 1, permissionId: 14, isActive: true},
				{roleId: 1, permissionId: 15, isActive: true},
			]
		},
		{
			id: 2,
			firstName: 'Margarette',
			lastName: 'Jones',
			email: 'margarette.jones@test.com',
			isActive: true,
			roleId: 2,
		},
		{
			id: 3,
			firstName: 'Bethany',
			lastName: 'Doe',
			email: 'bethany.doe@test.com',
			isActive: true,
			roleId: 2,
		},
		{
			id: 4,
			firstName: 'Samuel',
			lastName: 'Jackson',
			email: 'samuel.jackson@test.com',
			isActive: true,
			roleId: 2,
		},
		{
			id: 5,
			firstName: 'Persival',
			lastName: 'Blinn',
			email: 'persival.blinn@test.com',
			isActive: false,
			roleId: 1,
		},
		{
			id: 6,
			firstName: 'Dylan',
			lastName: 'Berry',
			email: 'dylan.berry@test.com',
			isActive: true,
			roleId: 1,
		},
		{
			id: 7,
			firstName: 'Edward',
			lastName: 'Bell',
			email: 'edward.bell@test.com',
			isActive: true,
			roleId: 1,
		},
		{
			id: 8,
			firstName: 'Phil',
			lastName: 'Dyer',
			email: 'phil.dyer@test.com',
			isActive: false,
			roleId: 2,
		},
		{
			id: 9,
			firstName: 'Stephen',
			lastName: 'Henderson',
			email: 'stephen.henderson@test.com',
			isActive: true,
			roleId: 2,
		},
		{
			id: 10,
			firstName: 'Trevor',
			lastName: 'Lewis',
			email: 'trevor.lewis@test.com',
			isActive: true,
			roleId: 1,
		},
		{
			id: 11,
			firstName: 'William',
			lastName: 'Morgan',
			email: 'william.morgan@test.com',
			isActive: true,
			roleId: 2,
		},
		{
			id: 12,
			firstName: 'Sam',
			lastName: 'Walker',
			email: 'sam.walker@test.com',
			isActive: false,
			roleId: 2,
		},
	];
	private permissionGroupList: PermissionGroup[] = [
		{id: 1, name: 'Permission group 1'},
		{id: 2, name: 'Permission group 2'},
		{id: 3, name: 'Permission group 3'},
	];
	private permissionList: Permission[] = [
		{id: 1, name: 'Permission 1', permissionGroupId: 1},
		{id: 2, name: 'Permission 2', permissionGroupId: 1},
		{id: 3, name: 'Permission 3', permissionGroupId: 1},
		{id: 4, name: 'Permission 4', permissionGroupId: 1},
		{id: 5, name: 'Permission 5', permissionGroupId: 1},
		{id: 6, name: 'Permission 6', permissionGroupId: 2},
		{id: 7, name: 'Permission 7', permissionGroupId: 2},
		{id: 8, name: 'Permission 8', permissionGroupId: 2},
		{id: 9, name: 'Permission 9', permissionGroupId: 2},
		{id: 10, name: 'Permission 10', permissionGroupId: 2},
		{id: 11, name: 'Permission 11', permissionGroupId: 3},
		{id: 12, name: 'Permission 12', permissionGroupId: 3},
		{id: 13, name: 'Permission 13', permissionGroupId: 3},
		{id: 14, name: 'Permission 14', permissionGroupId: 3},
		{id: 15, name: 'Permission 15', permissionGroupId: 3},
		{id: 16, name: 'Super Admin'},
	];
	private rolePermissionList: RolePermission[] = [];

	constructor() {
		//populate records
		this.permissionList.forEach((p, i) => {
			this.roleList.forEach((r, j) => {
				this.rolePermissionList.push({roleId: r.id, permissionId: p.id, isActive: (i + j) % 2 === 1});
			});
		});
	}

	getUsers(pageSize: number, sort: Sort, page: number, searchWord?: string): UserResponse {
		let filteredUserList: User[] = this.userList;
		if (searchWord) {
			filteredUserList = this.userList.filter(u => {
				return u.email.includes(searchWord) || (((u.firstName || '') + ' ' + (u.lastName || '')).trim()).includes(searchWord);
			});
		}
		//
		let sortedUserList = filteredUserList;
		if (sort && sort.column) {
			let compareFn: (a: User, b: User) => number;
			switch (sort.column) {
				case 'user':
					compareFn = UserService.sortByFullName;
					break;
				case 'role':
					compareFn = UserService.sortByRole;
					break;
				case 'status':
					compareFn = UserService.sortByStatus;
					break;
			}
			if (compareFn) {
				sortedUserList = filteredUserList.sort(compareFn);
				if (sort.direction === 'desc') {
					sortedUserList = sortedUserList.reverse();
				}
			}
		}
		//
		const max = pageSize * page;
		const min = max - pageSize;
		const pagedUserList = sortedUserList.filter((u: User, i: number) => {
			return i >= min && i < max;
		});
		//
		return {
			list: pagedUserList,
			total: (searchWord ? sortedUserList : this.userList).length,
		};
	}

	getUserById(userId: number): User {
		const user: User = this.userList.find(u => u.id === userId);
		return user || null;
	}

	addUser(user: User): void {

		this.userList.push({
			...user,
			id: this.getMaxId() + 1
		});
	}

	updateUserStatus(userId: number, status: boolean): void {
		const user: User = this.getUserById(userId);
		if (user) {
			user.isActive = status;
		}
	}

	updateUser(userData: User): User {
		const user: User = this.getUserById(userData.id);
		if (user) {
			user.firstName = userData.firstName;
			user.lastName = userData.lastName;
			user.roleId = userData.roleId;
			user.customPermissionList = userData.customPermissionList;
			return user;
		}
		return null;
	}

	deleteUser(userId: number): void {
		this.userList = this.userList.filter((u: User) => u.id !== userId);
	}

	getRoles(): Role[] {
		return this.roleList;
	}

	getRoleNameById(roleId: number): string {
		if (roleId) {
			const role = this.roleList.find(r => r.id === roleId);
			return role ? role.name : '';
		}
		return '';
	}

	getPermissionGroups(): PermissionGroup[] {
		return this.permissionGroupList;
	}

	getPermissions(groupId?: number): Permission[] {
		if (groupId) {
			return this.permissionList.filter(p => p.permissionGroupId === groupId);
		}
		return this.permissionList;
	}

	getPermissionsWithoutGroup(): Permission[] {
		return this.permissionList.filter(p => !p.permissionGroupId);
	}

	getUserPermissionStatus(user: User, roleId: number, permissionId: number): boolean {
		if (user) {
			let rolePermission: RolePermission;
			if (user.customPermissionList && user.customPermissionList.length > 0) {
				rolePermission = this.getRolePermission(user.customPermissionList, roleId, permissionId);
			}
			if (!rolePermission) {
				rolePermission = this.getRolePermission(this.rolePermissionList, roleId, permissionId);
			}
			return rolePermission ? rolePermission.isActive : false;
		}
		return false;
	}

	getUserPermissionGroupStatus(user: User, roleId: number, permissionGroupId: number): boolean {
		if (user) {
			const groupPermissionList: Permission[] = this.permissionList.filter(p => p.permissionGroupId === permissionGroupId);
			const groupPermissionIds: number[] = groupPermissionList.map(p => p.id);
			let rolePermissionList: RolePermission[] = this.rolePermissionList.filter(rp => groupPermissionIds.includes(rp.permissionId) && rp.roleId === roleId);

			const rolePermissionKeyValue = new Map();
			if (user.customPermissionList && user.customPermissionList.length > 0) {
				const customRolePermissionList: RolePermission[] = user.customPermissionList.filter(rp => groupPermissionIds.includes(rp.permissionId));
				if (customRolePermissionList && customRolePermissionList.length > 0) {
					customRolePermissionList.forEach(rp => {
						rolePermissionKeyValue.set(rp.permissionId, rp.isActive);
					});
				}
			}
			//
			return rolePermissionList.every(rp => rolePermissionKeyValue.has(rp.permissionId) ? rolePermissionKeyValue.get(rp.permissionId) : rp.isActive);
		}
		return false;
	}

	private getRolePermission(rolePermissionList: RolePermission[], roleId: number, permissionId: number): RolePermission {
		const rolePermission: RolePermission = rolePermissionList.find(r => r.roleId === roleId && r.permissionId === permissionId);
		return rolePermission || null;
	}

	private static sortByFullName(a: User, b: User): number {
		const aFullName = ((a.firstName || '') + ' ' + (a.lastName || '')).trim();
		const bFullName = ((b.firstName || '') + ' ' + (b.lastName || '')).trim();
		if (aFullName < bFullName) {
			return -1;
		}
		if (aFullName > bFullName) {
			return 1;
		}
		return 0;
	}

	private static sortByRole(a: User, b: User): number {
		if (a.roleId < b.roleId) {
			return -1;
		}
		if (a.roleId > b.roleId) {
			return 1;
		}
		return 0;
	}

	private static sortByStatus(a: User, b: User): number {
		if (a.isActive && !b.isActive) {
			return -1;
		}
		if (!a.isActive && b.isActive) {
			return 1;
		}
		return 0;
	}

	private getMaxId(): number {
		return Math.max(...this.userList.map(u => u.id));
	}
}
