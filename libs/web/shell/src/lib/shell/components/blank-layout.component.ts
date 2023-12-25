import { Component } from '@angular/core';

@Component({
  selector: 'res-blank-layout',
  template: ` <ng-content></ng-content> `,
  standalone: true,
})
export class BlankLayoutComponent {}
