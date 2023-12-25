import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'res-login-email',
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
              <span class="label-text">帳號</span>
            </div>
            <input
              type="email"
              placeholder="請輸入帳號"
              formControlName="email"
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
          <a class="text-xs text-primary" routerLink="/register-email"
            >尚未擁有帳號嗎？前往註冊</a
          >
        </div>
      </form>
    </div>
  `,
  styles: [``],
})
export class LoginEmailComponent {
  #route = inject(Router);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    if (email === 'admin@gmail.com' && password === 'admin') {
      alert('登入成功，歡迎管理員');
      this.#route.navigateByUrl('/admin/students');
    }
    if (email === 'landlord@gmail.com' && password === 'landlord') {
      alert('登入成功');
      this.#route.navigateByUrl('/landlords/account');
    }
    console.log(this.form.getRawValue());
  }
}
