import { Component } from '@angular/core';

@Component({
  selector: 'res-landlord-account',
  standalone: true,
  template: `
    <div>姓名：{{ account.name }}</div>
    <div>信箱：{{ account.email }}</div>
    <div>電話：{{ account.phone }}</div>
  `,
  styles: [``],
  imports: [],
})
export class LandlordAccountComponent {
  account = {
    id: 1,
    name: '陳浣熊',
    email: 'raccoon@gmail.com',
    phone: '0912345678',
  };
}
