import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'res-admin-renting',
  standalone: true,
  template: `
    <table mat-table [dataSource]="data" class="mat-elevation-z8">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>標題</th>
        <td mat-cell *matCellDef="let element">{{ element.title }}</td>
      </ng-container>

      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef>刊登日期</th>
        <td mat-cell *matCellDef="let element">{{ element.date }}</td>
      </ng-container>

      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>價格</th>
        <td mat-cell *matCellDef="let element">{{ element.price }}</td>
      </ng-container>

      <ng-container matColumnDef="landlord">
        <th mat-header-cell *matHeaderCellDef>房東</th>
        <td mat-cell *matCellDef="let element">{{ element.landlord }}</td>
      </ng-container>

      <ng-container matColumnDef="student">
        <th mat-header-cell *matHeaderCellDef>承租學生</th>
        <td mat-cell *matCellDef="let element">{{ element.student }}</td>
      </ng-container>

      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef>編輯</th>
        <td mat-cell *matCellDef="let element">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            [routerLink]="['/renting', element.id, 'edit']"
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
export class AdminRentingComponent {
  data = [
    {
      id: 1,
      title: '陽光小宅',
      tags: [
        {
          id: 1,
          name: '近校',
        },
        {
          id: 2,
          name: '近市區',
        },
      ],
      image: 'image1',
      type: '3房1廳2衛',
      square: 20,
      floor: 5,
      totalFloor: 10,
      campus: '光復校區',
      description: '生活機能良好，租戶單純',
      date: '12/3',
      price: '5500',
      landlord: '王小明',
    },
    {
      id: 2,
      title: '貓貓宅',
      tags: [
        {
          id: 1,
          name: '可養寵物',
        },
        {
          id: 2,
          name: '有陽台',
        },
        {
          id: 2,
          name: '可開伙',
        },
      ],
      image: 'image1',
      type: '1房1廳1衛1陽台',
      square: 12,
      floor: 3,
      totalFloor: 5,
      campus: '自強校區',
      description: '生活機能良好，租戶單純',
      date: '12/9',
      price: '7500',
      landlord: '陳小花',
    },
    {
      id: 3,
      title: '許家大院',
      image: 'image1',
      type: '4房1廳2衛',
      square: 32,
      floor: 2,
      totalFloor: 8,
      campus: '成杏校區',
      description: '生活機能良好，租戶單純',
      date: '12/12',
      price: '25000',
      landlord: '許小美',
    },
  ];
  displayedColumns: string[] = [
    'title',
    'date',
    'price',
    'landlord',
    'student',
    'edit',
    'delete',
  ];
}
