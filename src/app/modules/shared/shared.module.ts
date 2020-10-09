import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/entities/modal.directive';
import { UserDeleteModalComponent } from './modals/user-delete-modal/user-delete-modal.component';
import { UserInviteModalComponent } from './modals/user-invite-modal/user-invite-modal.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
	declarations: [HeaderComponent, ModalComponent, ModalDirective, UserDeleteModalComponent, UserInviteModalComponent],
	exports: [
		HeaderComponent,
		ModalComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	]
})
export class SharedModule {
}
