import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AutocompleteResponse } from '../../models/autocomplete-response.model';

@Component({
  selector: 'app-auto-complete-form',
  templateUrl: './app-auto-complete-form.component.html',
  styleUrls: ['./app-auto-complete-form.component.css'],
  standalone: true,
  imports: [AutoCompleteModule, FloatLabelModule, CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteFormComponent),
      multi: true
    }
  ]
})
export class AutoCompleteFormComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() optionLabel: string = 'text';  // 👈 cómo mostrar en pantalla
  @Input() suggestions: AutocompleteResponse[] = [];

  @Output() search = new EventEmitter<string>();

  value: AutocompleteResponse | null = null;   // 👈 ahora el form trabaja solo con IDs
  disabled = false;

  // ControlValueAccessor
  onChange = (_: any) => { };
  onTouched = () => { };

  writeValue(obj: AutocompleteResponse | null): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSearch(event: AutoCompleteCompleteEvent) {
    this.search.emit(event.query);
  }

  onSelect(option: AutocompleteResponse) {
    this.value = option;   // 👈 devolvemos solo el id al form
    this.onChange(this.value);
  }

  onClear() {
    this.value = null;
    this.onChange(this.value);
  }
}
