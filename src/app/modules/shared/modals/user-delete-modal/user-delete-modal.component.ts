import {Component, OnInit} from '@angular/core';
import {ModalBase} from "../../modal/entities/modal-base";
import {ModalService} from "../../../../services/modal.service";

@Component({
	selector: 'app-user-delete-modal',
	templateUrl: './user-delete-modal.component.html',
	styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent extends ModalBase implements OnInit {

	constructor(private modalService: ModalService) {
		super();
	}

	ngOnInit(): void {
	}

	onDeleteUserClick(): void {
		this.modalService.confirmUserDeleteModal(this.data.id);
	}

}
