import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {Header} from "../../../models/header";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	title: string;
	showSearch: boolean = false;
	showButton: boolean = false;
	disableButton: boolean = false;
	buttonIcon: string;

	updateHeaderSub: Subscription;

	constructor(private headerService: HeaderService) {
		this.headerService.updateHeader$.subscribe((header: Header) => {
			this.title = header.title || '';
			this.showSearch = !!header.showSearch;
			this.showButton = !!header.showButton;
			this.disableButton = !!header.disableButton;
			this.buttonIcon = header.buttonIcon;
		});
	}

	ngOnInit(): void {
	}

	onSearchChange(e): void {
		this.headerService.onSearchChange(e.target.value);
	}

	onButtonClick():void {
		if(!this.disableButton){
			this.headerService.onButtonClick();
		}
	}

	ngOnDestroy(): void {
		this.updateHeaderSub.unsubscribe();
	}

}
