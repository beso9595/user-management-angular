import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-toggle',
	templateUrl: './toggle.component.html',
	styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

	@Input() isActive: boolean = false;
	@Output() onChange = new EventEmitter<boolean>();

	constructor() {
	}

	ngOnInit(): void {
	}

	onToggleChange(): void {
		this.onChange.emit(!this.isActive);
	}

}
