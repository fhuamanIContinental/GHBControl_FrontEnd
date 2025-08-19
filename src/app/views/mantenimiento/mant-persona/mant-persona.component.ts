import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericFilterRequest } from '../../../models/GenericFilterRequest';

import { VistaPersonaResponse } from '../../../models/VistaPersonaResponse';
import { GenericFilterResponse } from '../../../models/GenericFilterResponse';
import { SHARED_MANT_IMPORTS } from '../../../shared/shared-mant';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { MantPersonaEditComponent } from './mant-persona-edit/mant-persona-edit.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NumbersOnlyDirective } from '../../../directivas/NumbersOnlyDirective';
import { MantPersonaService } from '../../../services/mant-persona.service';




@Component({
  selector: 'app-mant-persona',
  imports: [SHARED_MANT_IMPORTS, NumbersOnlyDirective],
  templateUrl: './mant-persona.component.html',
  styleUrl: './mant-persona.component.scss'
})
export class MantPersonaComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;

  filter: GenericFilterRequest = new GenericFilterRequest();
  personas: VistaPersonaResponse[] = [];
  totalItems = 0; // ejemplo
  titleModal: string = '';

  itemSelected: VistaPersonaResponse | null = null;


  formFilter: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _personaService: MantPersonaService
  ) {
    this.formFilter = this.fb.group({
      fullname: ['', []],
      document: ['', []],
    });
  }


  addItem() {
    this.itemSelected = new VistaPersonaResponse();
    this.titleModal = 'Nuevo Registro Persona';
    this.openModal();
  }

  editItem(data: VistaPersonaResponse) {
    this.itemSelected = data;
    this.titleModal = 'Editar Registro Persona';
    this.openModal();
  }

  openModal() {
    this.modal.open(MantPersonaEditComponent, {
      size: 'xxl',
      data: this.itemSelected

    });
  }

  ngOnInit(): void {

    this.listarPersonas();
  }

  listarPersonas() {
    this._personaService.getByFilter(this.filter).subscribe({
      next: (response: GenericFilterResponse<VistaPersonaResponse>) => {
        this.personas = response.list;
        this.totalItems = response.totalRecord;
        console.log('Personas:', response);
      },
      error: (error) => {
        console.error('Error fetching personas:', error);
      }
    });
  }


  onPageChanged(page: number) {
    this.filter.page = page;
    this.listarPersonas(); // método que obtiene la data paginada
  }

  btnBuscar() {
    this.filter.filters = [
      { name: 'fullName', value: this.formFilter.value.fullname },
      { name: 'document', value: this.formFilter.value.document }
    ].filter(item => item.value != null && item.value !== '');

    this.listarPersonas();
  }

  btnLimpiar() {
    this.filter = new GenericFilterRequest();
    this.formFilter.reset();
    this.listarPersonas();
  }

}
