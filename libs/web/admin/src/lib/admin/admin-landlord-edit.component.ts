import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'res-admin-landlord-edit',
  standalone: true,
  template: `
    <form [formGroup]="form" (submit)="submit()">
      <div class="flex flex-col w-full gap-2">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">姓名</span>
          </div>
          <input
            type="text"
            placeholder="請輸入姓名"
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

        <div class="pt-4">
          <button type="submit" class="btn btn-primary btn-sm">儲存</button>
        </div>
      </div>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class AdminLandlordEditComponent {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) return;

    console.log(this.form.getRawValue());
  }
}
