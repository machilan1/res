import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'res-register',
  standalone: true,
  template: `
    <div class="w-full h-screen flex justify-center items-center">
      <form
        [formGroup]="form"
        (submit)="submit()"
        class="w-96 border border-primary rounded-lg p-4"
      >
        <div class="text-4xl text-center py-2">註冊</div>
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
              <span class="label-text">電話</span>
            </div>
            <input
              type="tel"
              placeholder="請輸入電話"
              formControlName="phone"
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
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">確認密碼</span>
            </div>
            <input
              type="password"
              placeholder="請再次輸入密碼"
              formControlName="confirmPassword"
              class="input input-bordered w-full max-w-xs input-sm"
            />
          </label>
          <div class="pt-2">
            <button type="submit" class="btn btn-primary btn-sm">註冊</button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [``],
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  submit() {
    const { password, confirmPassword } = this.form.getRawValue();
    if (this.form.invalid) return;
    if (password !== confirmPassword) {
      alert('密碼不一致');
      return;
    }
    console.log(this.form.getRawValue());
  }
}
