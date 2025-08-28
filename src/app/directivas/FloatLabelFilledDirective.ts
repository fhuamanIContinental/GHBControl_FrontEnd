import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[autoFilledClass]',
    standalone: true
})
export class AutoFilledClassDirective implements OnInit {

    constructor(
        private el: ElementRef<HTMLInputElement>,
        private control: NgControl
    ) { }

    ngOnInit() {
        // 👀 Debug
        console.log('Directiva inicializada en', this.el.nativeElement);

        // estado inicial
        this.toggleClass(this.control.value);

        // cambios
        this.control.valueChanges?.subscribe(value => {
            this.toggleClass(value);
        });
    }

    private toggleClass(value: any) {
        const input = this.el.nativeElement;
        if (value !== null && value !== undefined && value !== '') {
            input.classList.add('p-filled');
        } else {
            input.classList.remove('p-filled');
        }
    }
}
