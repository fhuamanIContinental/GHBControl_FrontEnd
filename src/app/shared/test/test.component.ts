// test-hostlistener/src/app/test/test.component.ts
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (event instanceof KeyboardEvent) {
      console.log('Escape presionado', event);
    }
  }
}
