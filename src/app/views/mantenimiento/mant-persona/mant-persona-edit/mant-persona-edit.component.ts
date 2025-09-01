import { Component, inject, input, Input, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARED_MANT_IMPORTS } from '../../../../shared/shared-mant';
import { PersonGenderService } from '../../../../services/person-gender.service';
import { PersonTypeDocumentService } from '../../../../services/person-type-document.service';
import { PersonTypeService } from '../../../../services/person-type.service';
import { AutocompleteResponse } from '../../../../models/autocomplete-response.model';
import { VistaPersonaResponse } from '../../../../models/VistaPersonaResponse';
import { forkJoin } from 'rxjs';
import { PersonService } from '../../../../services/person.service';
import { PersonaRequest } from '../../../../models/persona-request.model';



@Component({
  selector: 'app-mant-persona-edit',
  imports: [ReactiveFormsModule, SHARED_MANT_IMPORTS],
  templateUrl: './mant-persona-edit.component.html',
  styleUrl: './mant-persona-edit.component.scss'
})
export class MantPersonaEditComponent implements OnInit {

  data = input<VistaPersonaResponse>(new VistaPersonaResponse());
  onSave = output<boolean>();


  registro: PersonaRequest = new PersonaRequest();
  titleModal: string = "Editar Persona";
  submitted: boolean = false;


  personForm: FormGroup;
  personId: number = 0;
  personTypes: AutocompleteResponse[] = [];
  personTypeDocuments: AutocompleteResponse[] = [];
  personGender: AutocompleteResponse[] = [];
  personTypes_all: AutocompleteResponse[] = [];
  personTypeDocuments_all: AutocompleteResponse[] = [];
  personGender_all: AutocompleteResponse[] = [];
  personStatuses: AutocompleteResponse[] = [];
  personStatuses_all: AutocompleteResponse[] = [];
  documentTypes: any[] = [];
  genders: any[] = [];



  _personTypeService = inject(PersonTypeService);
  _personTypeDocumentService = inject(PersonTypeDocumentService);
  _personGenderService = inject(PersonGenderService);
  _personService = inject(PersonService);


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.personForm = this.fb.group({
      id: [null, Validators.required],
      idPersonType: [null, Validators.required],
      idPersonTypeDocument: [null, Validators.required],
      document: [null, [Validators.required, Validators.maxLength(20)]],
      name: [null, [Validators.required, Validators.maxLength(100)]],
      lastNameFirst: [null, [Validators.required, Validators.maxLength(100)]],
      lastNameSecond: [null, [Validators.maxLength(100)]],
      blood_type: [null, Validators.maxLength(5)],
      birthDate: [new Date(), []],
      idGender: [null, [Validators.required]],
      idStatus: ['1', Validators.required]
    });
  }

  ngOnInit(): void {

    this.inicializarVistas();
  }

  inicializarVistas(): void {

    forkJoin({
      personTypes: this._personTypeService.getAutoComplete(),
      personTypeDocuments: this._personTypeDocumentService.getAutoComplete(),
      personGender: this._personGenderService.getAutoComplete(),
      personStatuses: this._personService.getStatus()
    }).subscribe({
      next: ({ personTypes, personTypeDocuments, personGender, personStatuses }) => {
        // aquí asignas a tus variables locales si quieres
        this.personTypes_all = personTypes;
        this.personTypeDocuments_all = personTypeDocuments;
        this.personGender_all = personGender;
        this.personStatuses_all = personStatuses;
      },
      error: (err) => {
        console.error('Error cargando datos', err);
        // opcional: mostrar mensaje al usuario
      },
      complete: () => {
        this.personForm.patchValue(this.data());
        this.personForm.patchValue({
          idPersonType: this.personTypes_all.find(x => x.id === this.data().idPersonType) || null,
          idPersonTypeDocument: this.personTypeDocuments_all.find(x => x.id === this.data().idPersonTypeDocument) || null,
          idGender: this.personGender_all.find(x => x.id === this.data().idGender) || null,
          idStatus: this.personStatuses_all.find(x => x.id === this.data().idStatus) || null,
        });
      }
    });
  }


  loadPersonTypes(): void {
    this._personTypeService.getAutoComplete().subscribe({
      next: (data: AutocompleteResponse[]) => {
        this.personTypes = data;

      },
      error: (err) => { },
      complete: () => { }
    });
  }

  loadDocumentTypes(): void {
    this._personTypeDocumentService.getAutoComplete().subscribe({
      next: (data: AutocompleteResponse[]) => {
        this.personTypeDocuments = data;

      },
      error: (err) => { },
      complete: () => { }
    });
  }

  loadGenders(): void {
    this._personGenderService.getAutoComplete().subscribe({
      next: (data: AutocompleteResponse[]) => {
        this.personGender = data;

      },
      error: (err) => { },
      complete: () => { }
    });
  }

  loadPersonData(): void {

  }

  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }



  onCancel(): void {
    this.onSave.emit(false);
  }

  searchPersonTypes(query: string) {
    this.personTypes = this.personTypes_all.filter(p =>
      p.text.toLowerCase().includes(query.toLowerCase())
    );
  }

  searchTypeDocumentPerson(query: string) {
    this.personTypeDocuments = this.personTypeDocuments_all.filter(p =>
      p.text.toLowerCase().includes(query.toLowerCase())
    );
  }
  searchGenderPerson(query: string) {
    this.personGender = this.personGender_all.filter(p =>
      p.text.toLowerCase().includes(query.toLowerCase())
    );
  }

  searchPersonStatus(query: string) {
    this.personStatuses = this.personStatuses_all.filter(p =>
      p.text.toLowerCase().includes(query.toLowerCase())
    );
  }

  onSubmit(): void {
    this.registro = this.personForm.getRawValue();

    this.registro.idPersonType = this.personForm.getRawValue().idPersonType?.id;
    this.registro.idPersonTypeDocument = this.personForm.getRawValue().idPersonTypeDocument?.id;
    this.registro.idGender = this.personForm.getRawValue().idGender?.id;
    this.registro.idStatus = this.personForm.getRawValue().idStatus?.id;
    this.registro.birthDate = this.formatDate(this.registro.birthDate);

    const action$ = this.registro.id
      ? this._personService.Update(this.registro)
      : this._personService.Create(this.registro);

    action$.subscribe({
      next: (res) => {
        this.onSave.emit(true);
      },
      error: (err) => console.error(err)
    });
  }




}