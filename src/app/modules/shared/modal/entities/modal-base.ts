import {Component, Input} from "@angular/core";
import {Observable} from "rxjs/src/internal/Observable";

@Component({
	template: ''
})
export abstract class ModalBase {
	@Input() data: any;
	confirmCallback: Observable<any>;
}
