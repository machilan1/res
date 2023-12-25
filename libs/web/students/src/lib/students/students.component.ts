import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'libs/web/shell/src/lib/shell/components/header.component';

@Component({
  selector: 'res-students',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, HeaderComponent],
  template: `
    <div class="w-full h-full">
      <div class="grid grid-cols-[1fr_5fr] h-full px-20 py-12">
        <div class="border-r border-primary text-center flex flex-col">
          <a routerLink="account" routerLinkActive="text-primary">個人資料</a>
          <a routerLink="renting" routerLinkActive="text-primary">我的收藏</a>
        </div>
        <div class="w-full h-full px-8">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class StudentsComponent {}
