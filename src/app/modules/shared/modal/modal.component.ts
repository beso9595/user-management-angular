import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalContainer} from "./entities/modal-container";
import {ModalDirective} from "./entities/modal.directive";
import {ModalBase} from "./entities/modal-base";
import {Subject} from "rxjs";

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	title: string;

	private confirmClick$ = (new Subject<any>()).asObservable();

	@Input() modal: ModalContainer;
	@Output() onClose = new EventEmitter<any>();

	@ViewChild(ModalDirective, {static: true}) modalDirective: ModalDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {
	}

	ngOnInit(): void {
		this.loadComponent();
	}

	loadComponent(): void {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modal.component);

		const viewContainerRef = this.modalDirective.viewContainerRef;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent<ModalBase>(componentFactory);
		componentRef.instance.data = this.modal.data;
		this.title = this.modal.title;
	}

	onCloseClick(): void {
		this.onClose.emit();
	}

}
