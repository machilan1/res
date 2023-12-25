import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { DefaultLayoutComponent } from './components/default-layout.component';
import { BlankLayoutComponent } from './components/blank-layout.component';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'res-shell',
  standalone: true,
  imports: [RouterOutlet, DefaultLayoutComponent, BlankLayoutComponent],
  template: `
    @switch (layoutService.layout()) {
      @case ('default') {
        <res-default-layout>
          <router-outlet></router-outlet>
        </res-default-layout>
      }
      @case ('blank') {
        <res-blank-layout>
          <router-outlet></router-outlet>
        </res-blank-layout>
      }
    }
  `,
  styles: [``],
})
export class ShellComponent {
  layoutService = inject(LayoutService);
}
