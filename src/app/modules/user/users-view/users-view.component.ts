import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderService} from "../../../services/header.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-users-view',
	templateUrl: './users-view.component.html',
	styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent implements OnInit, OnDestroy {

	searchWordChangeSub: Subscription;

	constructor(private headerService: HeaderService) {
		this.headerService.updateHeader({
			title: 'Project Access',
			showSearch: true,
		});
		//
		this.searchWordChangeSub = this.headerService.searchWordChange$.subscribe((searchWord: string) => {
			console.log(searchWord);
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.searchWordChangeSub.unsubscribe();
	}

}
