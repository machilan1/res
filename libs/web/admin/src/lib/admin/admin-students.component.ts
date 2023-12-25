import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'res-admin-students',
  standalone: true,
  template: `
    <table mat-table [dataSource]="data" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>姓名</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="studentNumber">
        <th mat-header-cell *matHeaderCellDef>學號</th>
        <td mat-cell *matCellDef="let element">{{ element.studentNumber }}</td>
      </ng-container>

      <ng-container matColumnDef="phone">
        <th mat-header-cell *matHeaderCellDef>電話</th>
        <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
      </ng-container>

      <ng-container matColumnDef="renting">
        <th mat-header-cell *matHeaderCellDef>租屋資訊</th>
        <td mat-cell *matCellDef="let element">{{ element.renting }}</td>
      </ng-container>

      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef>編輯</th>
        <td mat-cell *matCellDef="let element">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            routerLink="edit"
          >
            編輯
          </button>
        </td>
      </ng-container>

      <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef>刪除</th>
        <td mat-cell *matCellDef="let element">
          <button type="button" class="btn border-secondary border btn-sm">
            刪除
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: displayedColumns"
        class="hover:bg-primary hover:cursor-pointer"
      ></tr>
    </table>
  `,
  styles: [``],
  imports: [MatTableModule, RouterLink],
})
export class AdminStudentsComponent {
  data = [
    {
      id: 1,
      name: 'Hydrogen',
      studentNumber: 1.0079,
      phone: 1.0079,
      renting: 'H',
    },
    {
      id: 2,
      name: 'Helium',
      studentNumber: 4.0026,
      phone: 1.0079,
      renting: 'He',
    },
    {
      id: 3,
      name: 'Lithium',
      studentNumber: 6.941,
      phone: 1.0079,
      renting: 'Li',
    },
    {
      id: 4,
      name: 'Beryllium',
      studentNumber: 9.0122,
      phone: 1.0079,
      renting: 'Be',
    },
    {
      id: 5,
      name: 'Boron',
      studentNumber: 10.811,
      phone: 1.0079,
      renting: 'B',
    },
    {
      id: 6,
      name: 'Carbon',
      studentNumber: 12.0107,
      phone: 1.0079,
      renting: 'C',
    },
    {
      id: 7,
      name: 'Nitrogen',
      studentNumber: 14.0067,
      phone: 1.0079,
      renting: 'N',
    },
    {
      id: 8,
      name: 'Oxygen',
      studentNumber: 15.9994,
      phone: 1.0079,
      renting: 'O',
    },
    {
      id: 9,
      name: 'Fluorine',
      studentNumber: 18.9984,
      phone: 1.0079,
      renting: 'F',
    },
    {
      id: 10,
      name: 'Neon',
      studentNumber: 20.1797,
      phone: 1.0079,
      renting: 'Ne',
    },
  ];

  displayedColumns: string[] = [
    'name',
    'studentNumber',
    'phone',
    'renting',
    'edit',
    'delete',
  ];
}
