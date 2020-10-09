import {Component, OnInit} from '@angular/core';
import {ModalBase} from "../../modal/entities/modal-base";

@Component({
	selector: 'app-user-delete-modal',
	templateUrl: './user-delete-modal.component.html',
	styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent extends ModalBase implements OnInit {

	constructor() {
		super();
	}

	ngOnInit(): void {
	}

}
