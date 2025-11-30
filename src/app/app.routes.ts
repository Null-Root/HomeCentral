import { Routes } from '@angular/router';
import { HomeView } from '@src/app/views/home/home.view';
import { TrackingsView } from './views/trackings/trackings.view';
import { TrackingFormView } from './views/tracking-form/tracking-form.view';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => HomeView
	},
	{
		path: 'trackings',
		loadComponent: () => TrackingsView
	},
	{
		path: 'trackings/add',
		component: TrackingFormView
	},
	{
		path: 'trackings/edit/:id',
		component: TrackingFormView
	},
	{ path: '**', redirectTo: '' }
];
