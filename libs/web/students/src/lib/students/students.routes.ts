import { Route } from '@angular/router';
import { StudentsComponent } from './students.component';

export const STUDENT_ROUTES: Route[] = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      {
        path: 'account',
        loadComponent: () =>
          import('./students-account.component').then(
            (m) => m.StudentAccountComponent
          ),
      },
      {
        path: 'renting',
        loadComponent: () =>
          import('./students-rentings.component').then(
            (m) => m.StudentRentingsComponent
          ),
      },
    ],
  },
];
