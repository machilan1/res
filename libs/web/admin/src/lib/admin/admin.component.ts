import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'res-admin',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  template: `
    <div class="w-full h-full">
      <div class="grid grid-cols-[1fr_5fr] h-full px-20 py-12">
        <div class="border-r border-primary text-center flex flex-col">
          <a routerLink="students" routerLinkActive="text-primary">學生列表</a>
          <a routerLink="landlords" routerLinkActive="text-primary">房東列表</a>
          <a routerLink="renting" routerLinkActive="text-primary">租屋列表</a>
        </div>
        <div class="w-full h-full px-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class AdminComponent {}
