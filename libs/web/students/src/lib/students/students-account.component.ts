import { Component } from '@angular/core';

@Component({
  selector: 'res-student-account',
  standalone: true,
  template: `
    <div>姓名：{{ account.name }}</div>
    <div>學號：{{ account.studentNumber }}</div>
    <div>信箱：{{ account.email }}</div>
    <div>電話：{{ account.phone }}</div>
  `,
  styles: [``],
  imports: [],
})
export class StudentAccountComponent {
  account = {
    id: 1,
    name: '陳麻糬',
    studentNumber: 'B12345678',
    email: 'raccoon@gmail.com',
    phone: '0912345678',
  };
}
