import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';

export const ADMIN_ROUTES: Route[] = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'students',
        loadComponent: () =>
          import('./admin-students.component').then(
            (m) => m.AdminStudentsComponent
          ),
      },
      {
        path: 'students/edit',
        loadComponent: () =>
          import('./admin-student-edit.component').then(
            (m) => m.AdminStudentEditComponent
          ),
      },
      {
        path: 'landlords',
        loadComponent: () =>
          import('./admin-landlords.component').then(
            (m) => m.AdminLandlordsComponent
          ),
      },
      {
        path: 'landlords/edit',
        loadComponent: () =>
          import('./admin-landlord-edit.component').then(
            (m) => m.AdminLandlordEditComponent
          ),
      },
      {
        path: 'renting',
        loadComponent: () =>
          import('./admin-renting.component').then(
            (m) => m.AdminRentingComponent
          ),
      },
    ],
  },
];
