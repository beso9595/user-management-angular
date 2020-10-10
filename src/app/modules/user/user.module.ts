import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersViewComponent} from './users-view/users-view.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
	declarations: [UsersViewComponent, UserProfileComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule
    ],
	exports: [
		UsersViewComponent
	]
})
export class UserModule {
}
