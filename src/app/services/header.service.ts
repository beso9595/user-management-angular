import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Header} from "../models/header";

@Injectable({
	providedIn: 'root'
})
export class HeaderService {

	private updateHeaderSource = new Subject<Header>();

	updateHeader$ = this.updateHeaderSource.asObservable();

	updateHeader(data: Header) {
		this.updateHeaderSource.next(data);
	}
}
