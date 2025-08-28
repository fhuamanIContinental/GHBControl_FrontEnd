import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARED_MANT_IMPORTS } from '../../../../shared/shared-mant';
import { PersonGenderService } from '../../../../services/person-gender.service';
import { PersonTypeDocumentService } from '../../../../services/person-type-document.service';
import { PersonTypeService } from '../../../../services/person-type.service';
import { PersonService } from '../../../../services/person.service';
import { AutocompleteResponse } from '../../../../models/autocomplete-response.model';
import { VistaPersonaResponse } from '../../../../models/VistaPersonaResponse';



@Component({
  selector: 'app-mant-persona-edit',
  imports: [ReactiveFormsModule, SHARED_MANT_IMPORTS],
  templateUrl: './mant-persona-edit.component.html',
  styleUrl: './mant-persona-edit.component.scss'
})
export class MantPersonaEditComponent implements OnInit {

  @Input() data: VistaPersonaResponse = new VistaPersonaResponse();


  personForm: FormGroup;
  personId: number = 0;
  personTypes: AutocompleteResponse[] = [];
  personTypeDocuments: AutocompleteResponse[] = [];
  personGender: AutocompleteResponse[] = [];
  documentTypes: any[] = [];
  genders: any[] = [];


  _personService = inject(PersonService);
  _personTypeService = inject(PersonTypeService);
  _personTypeDocumentService = inject(PersonTypeDocumentService);
  _personGenderService = inject(PersonGenderService);


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.personForm = this.fb.group({
      idPersonType: [null, Validators.required],
      idPersonTypeDocument: [null, Validators.required],
      document: [null, [Validators.required, Validators.maxLength(20)]],
      name: [null, [Validators.required, Validators.maxLength(100)]],
      lastNameFirst: [null, [Validators.required, Validators.maxLength(100)]],
      lastNameSecond: [null, [Validators.maxLength(100)]],
      blood_type: [null, Validators.maxLength(5)],
      birthDate: [new Date(), []],
      idGender: [null, [Validators.required]],
      id_status: ['1', Validators.required]
    });
  }

  ngOnInit(): void {

    console.log(this.data);


    this.personId = this.route.snapshot.params['id'];
    // Cargar datos de combos
    this.loadPersonTypes();
    this.loadDocumentTypes();
    this.loadGenders();



    setTimeout(() => {
      this.personForm.patchValue(this.data);
      this.personForm.patchValue({
        idPersonType: this.personTypes.find(x => x.id === this.data.idPersonType) || null,
        idPersonTypeDocument: this.personTypeDocuments.find(x => x.id === this.data.idPersonTypeDocument) || null,
        idGender: this.personGender.find(x => x.id === this.data.idGender) || null,
      });
    }, 3000);
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

  onSubmit(): void {

  }

  onCancel(): void {
    this.router.navigate(['/personas']);
  }

  searchPersonTypes(query: string) {
    this.personTypes = [
      { id: 1, text: 'Natural' },
      { id: 2, text: 'Jurídica' }
    ].filter(p => p.text.toLowerCase().includes(query.toLowerCase()));

    setTimeout(() => {
      console.log(this.personForm.getRawValue());

    }, 1000);

  }

}