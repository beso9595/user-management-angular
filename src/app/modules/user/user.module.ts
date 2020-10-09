import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersViewComponent} from './users-view/users-view.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";


@NgModule({
	declarations: [UsersViewComponent, UserProfileComponent],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule
	],
	exports: [
		UsersViewComponent
	]
})
export class UserModule {
}
