import {RolePermission} from "./role-permission";

export interface User {
	id: number,
	firstName: string,
	lastName: string,
	email: string,
	isActive: boolean,
	roleId: number,
	customPermissionList?: RolePermission[],
}
