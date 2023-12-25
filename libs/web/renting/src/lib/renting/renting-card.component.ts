import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'res-renting-card',
  standalone: true,
  template: `
    @if (canEdit === true) {
      <a
        class="w-full border border-primary rounded-lg flex p-4"
        [routerLink]="['/renting', id, 'edit']"
      >
        <div class="w-full flex justify-between">
          <div class="flex gap-4 w-full">
            <div class="aspect-square h-full rounded-lg bg-red-500"></div>
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
              <div class="text-sm">描述 {{ renting.description }}</div>
            </div>
          </div>
          <div class="flex flex-col justify-between items-end text-sm">
            <div>{{ renting.date }}</div>
            <div class="text-lg">
              {{ renting.price | currency: 'TWD' : 'symbol' : '4.0' }}
            </div>
          </div>
        </div>
      </a>
    } @else {
      <a
        class="w-full border border-primary rounded-lg flex p-4"
        [routerLink]="['/renting', id]"
      >
        <div class="w-full flex justify-between">
          <div class="flex gap-4 w-full">
            <div class="aspect-square h-full rounded-lg bg-red-500"></div>
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
              <div class="text-sm">描述 {{ renting.description }}</div>
            </div>
          </div>
          <div class="flex flex-col justify-between items-end text-sm">
            <div>{{ renting.date }}</div>
            <div class="text-lg">
              {{ renting.price | currency: 'TWD' : 'symbol' : '4.0' }}
            </div>
          </div>
        </div>
      </a>
    }
  `,
  imports: [CurrencyPipe, RouterLink],
})
export class RentingCardComponent {
  @Input({ required: true }) renting: any;
  @Input() id?: any;
  @Input({ required: true }) canEdit: boolean = false;
}
