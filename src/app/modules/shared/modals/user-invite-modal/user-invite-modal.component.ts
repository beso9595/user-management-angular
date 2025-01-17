import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../../services/modal.service";
import {UserService} from "../../../../services/user.service";

@Component({
	selector: 'app-user-invite-modal',
	templateUrl: './user-invite-modal.component.html',
	styleUrls: ['./user-invite-modal.component.scss']
})
export class UserInviteModalComponent implements OnInit {

	userForm: FormGroup;

	constructor(private modalService: ModalService,
				public userService: UserService) {
		const emailPatternRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		this.userForm = new FormGroup({
			firstName: new FormControl(null, [Validators.required]),
			lastName: new FormControl(null, [Validators.required]),
			email: new FormControl(null, [Validators.required, Validators.pattern(emailPatternRegex)]),
			roleId: new FormControl(null, [Validators.required]),
		});
	}

	ngOnInit(): void {
	}

	hasError(fieldName: string): boolean {
		return (this.userForm.get(fieldName).touched || this.userForm.get(fieldName).dirty) && !this.userForm.get(fieldName).valid;
	}

	hasRequireError(fieldName: string): boolean {
		return this.userForm.get(fieldName).hasError('required');
	}

	onSendUserInvitationClick(): void {
		this.modalService.confirmUserInviteModal({
			id: null,
			firstName: this.userForm.get('firstName').value,
			lastName: this.userForm.get('lastName').value,
			email: this.userForm.get('email').value,
			roleId: +this.userForm.get('roleId').value,
			isActive: false,
		});
	}

}
