import {Type} from "@angular/core";

export class ModalContainer {
	constructor(public component: Type<any>,
				public title: string,
				public data: any) {
	}
}
