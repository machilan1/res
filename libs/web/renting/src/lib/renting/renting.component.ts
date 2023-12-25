import { Component } from '@angular/core';

import { RentingCardComponent } from './renting-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'res-renting',
  standalone: true,
  imports: [RentingCardComponent, RouterLink],
  template: `
    <div class="w-full h-full">
      <div class="grid grid-cols-[1fr_5fr] h-full px-20 py-12">
        <div class="border-r border-primary flex flex-col px-8">
          <div class="border border-primary w-full px-4 py-2 rounded-lg">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">選擇校區</span>
              </div>
              <select
                class="select select-primary w-full max-w-xs select-sm"
                formControlName="campus"
              >
                @for (campus of campuses; track campus.id) {
                  <option>{{ campus.name }}</option>
                }
              </select>
            </label>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">選擇類型</span>
              </div>
              <select
                class="select select-primary w-full max-w-xs select-sm"
                formControlName="type"
              >
                @for (type of types; track type.id) {
                  <option>{{ type.name }}</option>
                }
              </select>
            </label>
            <div class="flex flex-col">
              <div class="label">
                <span class="label-text">設備</span>
              </div>
              <div class="flex flex-col gap-2">
                @for (facility of facilities; track facility.id) {
                  <div class="form-control">
                    <label class="cursor-pointer flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="checkbox checkbox-primary"
                      /><span class="label-text">{{ facility.name }}</span>
                    </label>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full px-8">
          <div class="flex flex-col gap-4">
            @for (renting of rentings; track renting.id) {
              <div class="hover:shadow-lg">
                <res-renting-card
                  [renting]="renting"
                  [id]="renting.id"
                  [canEdit]="false"
                ></res-renting-card>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RentingComponent {
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

  campuses = [
    {
      id: 1,
      name: '自強校區',
    },
    {
      id: 2,
      name: '光復校區',
    },
    {
      id: 3,
      name: '成杏校區',
    },
  ];

  types = [
    {
      id: 1,
      name: '套房',
    },
    {
      id: 2,
      name: '雅房',
    },
    {
      id: 3,
      name: '整層住家',
    },
  ];

  facilities = [
    {
      id: 1,
      name: '冷氣',
    },
    {
      id: 2,
      name: '冰箱',
    },
    {
      id: 3,
      name: '洗衣機',
    },
  ];
}
