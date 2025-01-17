import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./modules/shared/shared.module";
import {CommonModule} from "@angular/common";
import {UserModule} from "./modules/user/user.module";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		SharedModule,
		UserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
