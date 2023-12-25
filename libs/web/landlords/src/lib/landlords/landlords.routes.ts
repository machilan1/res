import { LandlordAccountComponent } from './landlord-account.component';
import { Route } from '@angular/router';
import { LandlordsComponent } from './landlords.component';

export const LANDLORD_ROUTES: Route[] = [
  {
    path: '',
    component: LandlordsComponent,
    children: [
      {
        path: 'account',
        loadComponent: () =>
          import('./landlord-account.component').then(
            (m) => m.LandlordAccountComponent
          ),
      },
      {
        path: 'renting',
        loadComponent: () =>
          import('./landlord-rentings.component').then(
            (m) => m.LandlordRentingsComponent
          ),
      },
    ],
  },
];
