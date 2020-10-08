import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersViewComponent} from "./modules/user/users-view/users-view.component";
import {UserProfileComponent} from "./modules/user/user-profile/user-profile.component";


const routes: Routes = [
	{
		path: '',
		redirectTo: 'users',
		pathMatch: 'full'
	},
	{
		path: 'users',
		component: UsersViewComponent
	},
	{
		path: 'user/:id',
		component: UserProfileComponent
	},
	{
		path: '**',
		redirectTo: 'users'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
