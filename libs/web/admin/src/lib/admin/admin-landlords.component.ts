import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'res-admin-landlords',
  standalone: true,
  template: `
    <table mat-table [dataSource]="data" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>姓名</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="phone">
        <th mat-header-cell *matHeaderCellDef>電話</th>
        <td mat-cell *matCellDef="let element">{{ element.phone }}</td>
      </ng-container>

      <ng-container matColumnDef="isForbidden">
        <th mat-header-cell *matHeaderCellDef>是否被禁止刊登貼文</th>
        <td mat-cell *matCellDef="let element">{{ element.isForbidden }}</td>
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
        routerLink="edit"
        class="hover:bg-primary hover:cursor-pointer"
      ></tr>
    </table>
  `,
  styles: [``],
  imports: [MatTableModule, RouterLink],
})
export class AdminLandlordsComponent {
  data = [
    {
      id: 1,
      name: 'Hydrogen',
      phone: 1.0079,
      isForbidden: false,
      renting: 8,
    },
    {
      id: 2,
      name: 'Helium',
      phone: 1.0079,
      isForbidden: false,
      renting: 0,
    },
    {
      id: 3,
      name: 'Lithium',
      phone: 1.0079,
      isForbidden: false,
      renting: 2,
    },
    {
      id: 4,
      name: 'Beryllium',
      phone: 1.0079,
      isForbidden: false,
      renting: 4,
    },
    {
      id: 5,
      name: 'Boron',
      phone: 1.0079,
      isForbidden: false,
      renting: 2,
    },
    {
      id: 6,
      name: 'Carbon',
      phone: 1.0079,
      isForbidden: false,
      renting: 4,
    },
    {
      id: 7,
      name: 'Nitrogen',
      phone: 1.0079,
      isForbidden: false,
      renting: 1,
    },
    {
      id: 8,
      name: 'Oxygen',
      phone: 1.0079,
      isForbidden: false,
      renting: 6,
    },
    {
      id: 9,
      name: 'Fluorine',
      phone: 1.0079,
      isForbidden: false,
      renting: 2,
    },
    {
      id: 10,
      name: 'Neon',
      phone: 1.0079,
      isForbidden: false,
      renting: 3,
    },
  ];
  displayedColumns: string[] = [
    'name',
    'phone',
    'isForbidden',
    'renting',
    'edit',
    'delete',
  ];
}
