import {Injectable} from '@angular/core';
import {User} from "../models/user/user";
import {Sort} from "../models/sort";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private list: User[] = [
		{
			id: 1,
			firstName: 'Danniel',
			lastName: 'Blichman',
			email: 'danniel.blichman@test.com',
			isActive: true,
			roleId: 1,
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

	constructor() {
	}

	getUsers(pageSize: number, sort: Sort, page: number, searchWord?: string): User[] {
		let filteredUserList: User[] = this.list;
		if (searchWord) {
			filteredUserList = this.list.filter(u => {
				return u.email.includes(searchWord) || (((u.firstName || '') + ' ' + (u.lastName || '')).trim()).includes(searchWord);
			});
		}
		//
		let sortedUserList = filteredUserList;
		if (sort && sort.column) {
			let compareFn: (a: User, b: User) => number;
			switch (sort.column) {
				case 'user':
					compareFn = this.sortByFullName;
					break;
				case 'role':
					compareFn = this.sortByRole;
					break;
				case 'status':
					compareFn = this.sortByStatus;
					break;
			}
			if (compareFn) {
				sortedUserList = filteredUserList.sort(compareFn);
			}
		}
		//

		return sortedUserList;
	}

	private sortByFullName(a: User, b: User): number {
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

	private sortByRole(a: User, b: User): number {
		if (a.roleId < b.roleId) {
			return -1;
		}
		if (a.roleId > b.roleId) {
			return 1;
		}
		return 0;
	}

	private sortByStatus(a: User, b: User): number {
		if (a.roleId && !b.roleId) {
			return -1;
		}
		if (!a.roleId && b.roleId) {
			return 1;
		}
		return 0;
	}
}
