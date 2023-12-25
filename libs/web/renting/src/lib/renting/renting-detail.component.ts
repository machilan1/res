import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'res-renting-detail',
  standalone: true,
  template: `
    <div class="w-full h-full">
      <div class="w-full px-20 py-12">
        <div class="w-full grid grid-cols-2 gap-4 pt-4">
          <div class="w-full aspect-[4/3] bg-red-500"></div>
          <div class="grid grid-cols-2 grid-rows-2 gap-4">
            <div class="w-full aspect-[4/3] bg-red-500"></div>
            <div class="w-full aspect-[4/3] bg-red-500"></div>
            <div class="w-full aspect-[4/3] bg-red-500"></div>
            <div class="w-full aspect-[4/3] bg-red-500"></div>
          </div>
        </div>
        <div class="w-full flex justify-between py-4 border-b border-primary">
          <div class="flex flex-col">
            <div class="flex gap-4 items-center">
              <div class="text-lg">{{ renting.title }}</div>
              <div class="flex gap-2">
                @for (tag of renting.tags; track tag.id) {
                  <div class="bg-yellow-200 rounded-full px-2 text-xs">
                    {{ tag.name }}
                  </div>
                }
              </div>
            </div>
            <div class="text-sm">鄰近 {{ renting.campus }}</div>
            <div class="flex gap-2">
              <div class="text-sm">{{ renting.type }}</div>
              <div class="text-sm">{{ renting.square }}坪</div>
              <div class="text-sm">
                {{ renting.floor }} / {{ renting.totalFloor }}
              </div>
            </div>
            <div class="text-sm">{{ renting.description }}</div>
            <div class="text-sm">地址：{{ renting.address }}</div>
          </div>

          <div class="flex flex-col justify-between items-end text-sm">
            <div>{{ renting.date }}</div>
            <div class="text-lg">
              {{ renting.price | currency: 'TWD' : 'symbol' : '4.0' }}
            </div>
          </div>
        </div>
        <div class="pt-4">
          <div class="text-lg">租屋規則</div>
          <div class="flex flex-col gap-1">
            @for (rule of renting.rules; track rule.id) {
              <div class="flex gap-2 items-center">
                <div class="w-2 h-2 rounded-full bg-primary"></div>
                <div class="text-sm">{{ rule.name }}</div>
              </div>
            }
          </div>
        </div>
        <div class="pt-4">
          <div class="text-lg">設備與服務</div>
          <div class="grid grid-cols-8 gap-4 pt-4">
            @for (facility of renting.facilities; track facility.id) {
              <div class="flex flex-col items-center">
                <div class="text-sm">{{ facility.name }}</div>
                <img [src]="facility.icon" class="w-12 h-12 rounded-lg" />
              </div>
            }
          </div>
        </div>
        <div class="pt-4">
          <div class="text-lg">房東資訊</div>
          <div class="flex flex-col gap-1">
            <div class="text-sm">陳浣熊 0933339784</div>
            <div class="text-sm">聯絡時間：早上8點到晚上5點</div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CurrencyPipe],
})
export class RentingDetailComponent {
  renting = {
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
    address: '台南市東區自強路一段1號',
    date: '12/9',
    price: '7500',
    rules: [
      {
        id: 1,
        name: '最短租期一年，押金兩個月',
      },
      {
        id: 2,
        name: '不可使用明火，可養寵物',
      },
    ],
    facilities: [
      {
        id: 1,
        name: '冷氣',
        icon: '/assets/cold.png',
      },
      {
        id: 2,
        name: '冰箱',
        icon: '/assets/fridge.png',
      },
      {
        id: 3,
        name: '洗衣機',
        icon: '/assets/washer.png',
      },
      {
        id: 4,
        name: '熱水器',
        icon: '/assets/heater.png',
      },
      {
        id: 5,
        name: '天然瓦斯',
        icon: '/assets/gas.png',
      },
      {
        id: 6,
        name: '網路',
        icon: '/assets/net.png',
      },
      {
        id: 7,
        name: '第四台',
        icon: '/assets/fourth.png',
      },
      {
        id: 8,
        name: '沙發',
        icon: '/assets/sofa.png',
      },
      {
        id: 9,
        name: '電視',
        icon: '/assets/tv.png',
      },
      {
        id: 10,
        name: '床',
        icon: '/assets/bed.png',
      },
      {
        id: 11,
        name: '衣櫃',
        icon: '/assets/closet.png',
      },
      {
        id: 12,
        name: '桌椅',
        icon: '/assets/table_chairs.png',
      },

      {
        id: 13,
        name: '微波爐',
        icon: '/assets/heater.png',
      },
      {
        id: 14,
        name: '停車場',
        icon: '/assets/park.png',
      },
      {
        id: 15,
        name: '電梯',
        icon: '/assets/lift.png',
      },
    ],
  };
}
