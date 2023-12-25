import { Component } from '@angular/core';
import { RentingCardComponent } from '@res/renting';

@Component({
  selector: 'res-landlord-rentings',
  standalone: true,
  template: `
    <div class="flex flex-col gap-4">
      @for (renting of rentings; track renting.id) {
        <div class="hover:shadow-lg">
          <res-renting-card
            [renting]="renting"
            [id]="renting.id"
            [canEdit]="true"
          ></res-renting-card>
        </div>
      }
    </div>
  `,
  styles: [``],
  imports: [RentingCardComponent],
})
export class LandlordRentingsComponent {
  rentings = [
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
    },
  ];
}
