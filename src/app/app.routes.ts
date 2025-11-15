import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
	},
	{
		path: 'trackings',
		loadComponent: () => import('./trackings/trackings.component').then((m) => m.TrackingsComponent)
	},
	{ path: '**', redirectTo: '' }
];
