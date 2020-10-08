import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Header} from "../models/header";

@Injectable({
	providedIn: 'root'
})
export class HeaderService {

	private updateHeaderSource = new Subject<Header>();
	private searchWordChangeSource = new Subject<string>();
	private buttonClickSource = new Subject<any>();

	updateHeader$ = this.updateHeaderSource.asObservable();
	searchWordChange$ = this.searchWordChangeSource.asObservable();
	buttonClick$ = this.buttonClickSource.asObservable();

	updateHeader(data: Header) {
		this.updateHeaderSource.next(data);
	}

	onSearchChange(searchWord: string) {
		this.searchWordChangeSource.next(searchWord);
	}

	onButtonClick() {
		this.buttonClickSource.next();
	}
}
