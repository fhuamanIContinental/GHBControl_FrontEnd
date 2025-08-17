import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  standalone: true
})
export class AutocompleteInputComponent {
  @Input() placeholder: string = '';
  @Input() options: any[] = [];
  @Input() displayKey: string = 'label'; // o el nombre de la propiedad a mostrar

  @Output() valueSelected = new EventEmitter<any>();

  inputText: string = '';
  filteredOptions: any[] = [];
  showDropdown: boolean = false;

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputText = value;
    this.filteredOptions = this.options.filter(option =>
      option[this.displayKey]
        .toLowerCase()
        .includes(value.toLowerCase())
    );
  }

  selectOption(option: any): void {
    this.inputText = option[this.displayKey];
    this.showDropdown = false;
    this.valueSelected.emit(option);
  }

  onBlur(): void {
    // delay to let mousedown register
    setTimeout(() => this.showDropdown = false, 100);
  }
}
