import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {Header} from "../../../models/header";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	title: string;
	showSearch: boolean = false;

	constructor(private headerService: HeaderService) {
		this.headerService.updateHeader$.subscribe((header: Header) => {
			this.title = header.title || '';
			this.showSearch = !!header.showSearch;
		});
	}

	ngOnInit(): void {
	}

}
