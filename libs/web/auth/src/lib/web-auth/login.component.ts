import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'res-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="w-full h-screen flex justify-center items-center">
      <form
        [formGroup]="form"
        (submit)="submit()"
        class="w-96 border border-primary rounded-lg p-4"
      >
        <div class="text-4xl text-center py-2">登入</div>
        <div class="flex flex-col w-full items-center gap-2">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">學號</span>
            </div>
            <input
              type="text"
              placeholder="請輸入學號"
              formControlName="username"
              class="input input-bordered w-full max-w-xs input-sm"
            />
          </label>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">密碼</span>
            </div>
            <input
              type="password"
              placeholder="請輸入密碼"
              formControlName="password"
              class="input input-bordered w-full max-w-xs input-sm"
            />
          </label>
          <div class="pt-2">
            <button type="submit" class="btn btn-primary btn-sm">登入</button>
          </div>
          <div class="flex justify-between w-full pt-2">
            <a class="text-xs" routerLink="/login-email">非學生登入</a>
            <a class="text-xs text-primary" routerLink="/register"
              >尚未擁有帳號嗎？前往註冊</a
            >
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [``],
})
export class LoginComponent {
  #route = inject(Router);
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.getRawValue();
    if (username === 'b11111111' && password === '11111111') {
      alert('登入成功');
      this.#route.navigate(['/students/account']);
    }
    console.log(this.form.getRawValue());
  }
}
