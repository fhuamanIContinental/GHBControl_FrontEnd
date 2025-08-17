import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        const allowedKeys = [
            'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft',
            'ArrowRight', 'Delete', 'Enter'
        ];

        if (allowedKeys.includes(event.key)) {
            return;
        }

        // Permitir Ctrl+A/C/V/X
        if (event.ctrlKey && ['a', 'c', 'v', 'x'].includes(event.key)) {
            return;
        }

        if (!/^[0-9]$/.test(event.key)) {
            event.preventDefault();
        }
    }
}