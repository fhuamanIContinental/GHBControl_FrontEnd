import { DatePipe, AsyncPipe, CurrencyPipe, DecimalPipe, CommonModule } from '@angular/common';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input/date-input.component';

export const SHARED_MANT_IMPORTS = [
    CommonModule,
    AutocompleteInputComponent,
    ModalComponent,
    ReactiveFormsModule,
    DatePipe,
    AsyncPipe,
    CurrencyPipe,
    DecimalPipe,
    PaginacionComponent,
    DateInputComponent
];
