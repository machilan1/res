import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  layout = signal<'blank' | 'default'>('default');

  setLayout(layout: 'blank' | 'default') {
    this.layout.set(layout);
  }
}
