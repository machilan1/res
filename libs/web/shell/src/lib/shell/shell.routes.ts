import { RentingDetailComponent } from './../../../../renting/src/lib/renting/renting-detail.component';
import { Route } from '@angular/router';
import { ShellComponent } from './shell.component';
import { inject } from '@angular/core';
import { LayoutService } from './services/layout.service';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      // {
      //   path: '',
      //   resolve: {
      //     layout: () => {
      //       const layoutService = inject(LayoutService);
      //       layoutService.setLayout('blank');
      //     },
      //   },
      //   loadComponent: () =>
      //     import('@res/web-auth').then((m) => m.IdentityComponent),
      // },
      {
        path: '',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('blank');
          },
        },
        loadComponent: () =>
          import('@res/web-auth').then((m) => m.LoginComponent),
      },
      {
        path: 'login-email',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('blank');
          },
        },
        loadComponent: () =>
          import('@res/web-auth').then((m) => m.LoginEmailComponent),
      },
      {
        path: 'register',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('blank');
          },
        },
        loadComponent: () =>
          import('@res/web-auth').then((m) => m.RegisterComponent),
      },
      {
        path: 'register-email',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('blank');
          },
        },
        loadComponent: () =>
          import('@res/web-auth').then((m) => m.RegisterEmailComponent),
      },
      {
        path: 'renting',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('default');
          },
        },
        loadComponent: () =>
          import('@res/renting').then((m) => m.RentingComponent),
      },

      {
        path: 'renting/:rentingId',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('default');
          },
        },
        loadComponent: () =>
          import('@res/renting').then((m) => m.RentingDetailComponent),
      },
      {
        path: 'renting/:rentingId/edit',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('default');
          },
        },
        loadComponent: () =>
          import('@res/renting').then((m) => m.RentingEditComponent),
      },
      {
        path: 'students',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('default');
          },
        },
        loadChildren: () =>
          import('@res/students').then((m) => m.STUDENT_ROUTES),
      },
      {
        path: 'landlords',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('default');
          },
        },
        loadChildren: () =>
          import('@res/landlords').then((m) => m.LANDLORD_ROUTES),
      },
      {
        path: 'admin',
        resolve: {
          layout: () => {
            const layoutService = inject(LayoutService);
            layoutService.setLayout('default');
          },
        },
        loadChildren: () => import('@res/admin').then((m) => m.ADMIN_ROUTES),
      },
    ],
  },
];
