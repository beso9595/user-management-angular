import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	constructor(private headerService: HeaderService) {
		this.headerService.updateHeader({
			title: 'User Setup',
			showSearch: false,
			showButton: true,
			disableButton: true,
			buttonIcon: 'settings'
		});
	}

	ngOnInit(): void {
	}

}
