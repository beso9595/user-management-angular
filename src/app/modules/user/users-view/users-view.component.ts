import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";

@Component({
	selector: 'app-users-view',
	templateUrl: './users-view.component.html',
	styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit {

	constructor(private headerService: HeaderService) {
		this.headerService.updateHeader({
			title: 'Project Access',
			showSearch: true,
		});
	}

	ngOnInit(): void {
	}

}
