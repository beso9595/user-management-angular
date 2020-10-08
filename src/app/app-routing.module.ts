import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersViewComponent} from "./modules/user/users-view/users-view.component";


const routes: Routes = [
	{
		path: '',
		redirectTo: 'users',
		pathMatch: 'full'
	},
	{
		path: 'users',
		component: UsersViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
