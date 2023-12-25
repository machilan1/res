import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'res-default-layout',
  template: `
    <div>
      <header>
        <res-header></res-header>
      </header>
      <main>
        <ng-content></ng-content>
      </main>
    </div>
  `,
  imports: [HeaderComponent],
  standalone: true,
})
export class DefaultLayoutComponent {}
