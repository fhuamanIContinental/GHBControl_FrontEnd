import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericFilterRequest } from '../../../models/GenericFilterRequest';

import { VistaPersonaResponse } from '../../../models/VistaPersonaResponse';
import { GenericFilterResponse } from '../../../models/GenericFilterResponse';
import { SHARED_MANT_IMPORTS } from '../../../shared/shared-mant';
import { MantPersonaEditComponent } from './mant-persona-edit/mant-persona-edit.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NumbersOnlyDirective } from '../../../directivas/NumbersOnlyDirective';
import { PersonService } from '../../../services/person.service';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-mant-persona',
  imports: [SHARED_MANT_IMPORTS, NumbersOnlyDirective, MantPersonaEditComponent],
  templateUrl: './mant-persona.component.html',
  styleUrl: './mant-persona.component.scss'
})
export class MantPersonaComponent implements OnInit {

  filter: GenericFilterRequest = new GenericFilterRequest();
  personas: VistaPersonaResponse[] = [];
  totalItems = 0; // ejemplo
  titleModal: string = '';

  itemSelected: VistaPersonaResponse = new VistaPersonaResponse();


  formFilter: FormGroup;


  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private _personaService: PersonService
  ) {
    this.formFilter = this.fb.group({
      fullname: ['', []],
      document: ['', []],
    });
  }


  visible: boolean = false;

  addItem() {
    this.itemSelected = new VistaPersonaResponse();
    this.titleModal = 'Nuevo Registro Persona';
    this.visible = true;

  }

  editItem(data: VistaPersonaResponse) {
    this.itemSelected = data;
    this.titleModal = 'Editar Registro Persona';
    this.visible = true;
  }

  ngOnInit(): void {

    this.listarPersonas();
  }

  listarPersonas() {
    this._personaService.getByFilter(this.filter).subscribe({
      next: (response: GenericFilterResponse<VistaPersonaResponse>) => {
        this.personas = response.list;
        this.totalItems = response.totalRecord;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching personas:', error);
        this.loading = false;
      }
    });
  }

  loading: boolean = false;
  onPageChanged(event: any) {
    this.loading = true;
    this.filter.page = Math.floor(event.first / event.rows) + 1; // página 1-based
    this.listarPersonas();
    this.cdr.detectChanges();
    // this.filter.page = page;
    // this.listarPersonas(); // método que obtiene la data paginada
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

  closeModal(event: boolean) {
    this.visible = false;
    if (event) {
      this.listarPersonas();
    }

  }



}
