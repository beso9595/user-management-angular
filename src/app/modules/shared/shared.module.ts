import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { ModalDirective } from './modal/entities/modal.directive';
import { UserDeleteModalComponent } from './modals/user-delete-modal/user-delete-modal.component';


@NgModule({
	declarations: [HeaderComponent, ModalComponent, ModalDirective, UserDeleteModalComponent],
	exports: [
		HeaderComponent,
		ModalComponent,
	],
	imports: [
		CommonModule
	]
})
export class SharedModule {
}
