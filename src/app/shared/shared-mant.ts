import { DatePipe, AsyncPipe, CurrencyPipe, DecimalPipe, CommonModule } from '@angular/common';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateInputComponent } from './date-input/date-input.component';
import { AutoCompleteFormComponent } from './auto-complete-form-component/app-auto-complete-form.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IftaLabelModule } from 'primeng/iftalabel';
import { AutoFilledClassDirective } from '../directivas/FloatLabelFilledDirective';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
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
    DateInputComponent,
    AutoCompleteFormComponent,
    AutoCompleteModule, FloatLabelModule, FormsModule, IftaLabelModule, FloatLabelModule,
    AutoFilledClassDirective, DialogModule, ButtonModule

];
