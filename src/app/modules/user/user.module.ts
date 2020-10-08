import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersViewComponent} from './users-view/users-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
	declarations: [UsersViewComponent, UserProfileComponent],
	imports: [
		CommonModule
	],
	exports: [
		UsersViewComponent
	]
})
export class UserModule {
}
