import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Header} from "../models/header";

@Injectable({
	providedIn: 'root'
})
export class HeaderService {

	private updateHeaderSource = new Subject<Header>();
	private searchWordChangeSource = new Subject<string>();

	updateHeader$ = this.updateHeaderSource.asObservable();
	searchWordChange$ = this.searchWordChangeSource.asObservable();

	updateHeader(data: Header) {
		this.updateHeaderSource.next(data);
	}

	onSearchChange(searchWord: string) {
		this.searchWordChangeSource.next(searchWord);
	}
}
