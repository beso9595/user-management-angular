import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersViewComponent} from './users-view/users-view.component';


@NgModule({
	declarations: [UsersViewComponent],
	imports: [
		CommonModule
	],
	exports: [
		UsersViewComponent
	]
})
export class UserModule {
}
