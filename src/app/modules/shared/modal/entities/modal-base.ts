import {Component, Input} from "@angular/core";

@Component({
	template: ''
})
export abstract class ModalBase {
	@Input() data: any;
}
