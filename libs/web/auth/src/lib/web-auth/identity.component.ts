import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'res-identity',
  standalone: true,
  template: `
    <div class="w-full h-screen flex flex-col justify-center items-center">
      <div class="text-2xl font-medium py-8">請選擇身份</div>
      <div class="w-1/2 grid grid-cols-3 gap-12">
        <a
          class=" w-full aspect-square flex justify-center items-center text-xl font-medium rounded-lg border border-primary hover:bg-primary hover:text-white hover:text-3xl transition-all duration-500"
          routerLink="login"
        >
          學生
        </a>
        <a
          class=" w-full aspect-square flex justify-center items-center text-xl font-medium rounded-lg border border-primary hover:bg-primary hover:text-white hover:text-3xl transition-all duration-500"
          routerLink="login-email"
        >
          房東
        </a>
        <a
          class=" w-full aspect-square flex justify-center items-center text-xl font-medium rounded-lg border border-primary hover:bg-primary hover:text-white hover:text-3xl transition-all duration-500"
          routerLink="login-email"
        >
          管理員
        </a>
      </div>
    </div>
  `,
  styles: [``],
  imports: [RouterLink],
})
export class IdentityComponent {}
