import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARED_MANT_IMPORTS } from '../../../../shared/shared-mant';
import { PersonGenderService } from '../../../../services/person-gender.service';
import { PersonTypeDocumentService } from '../../../../services/person-type-document.service';
import { PersonTypeService } from '../../../../services/person-type.service';
import { PersonService } from '../../../../services/person.service';
import { PersonTypeResponse } from '../../../../models/person-type-response.model';
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
  documentTypes: any[] = [];
  genders: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private personTypeService: PersonTypeService,
    private personTypeDocumentService: PersonTypeDocumentService,
    private personGenderService: PersonGenderService

  ) {

    this.personForm = this.fb.group({
      idPersonType: [null, Validators.required],
      id_person_type_document: ['', Validators.required],
      document: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      lastNameFirst: ['', [Validators.required, Validators.maxLength(100)]],
      lastNameSecond: ['', [Validators.maxLength(100)]],
      blood_type: ['', Validators.maxLength(5)],
      birthDate: [new Date(), []],
      id_gender: [''],
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

    if (this.personId) {
      this.loadPersonData();
    }


    setTimeout(() => {
      this.personForm.patchValue(this.data);
      this.personForm.patchValue({
        idPersonType: this.personTypes.find(x => x.id === this.data.idPersonType) || null
      });
    }, 3000);
  }




  loadPersonTypes(): void {
    this.personTypeService.getAutoComplete().subscribe({
      next: (data: AutocompleteResponse[]) => {
        this.personTypes = data;

      },
      error: (err) => { },
      complete: () => { }


    });
  }

  loadDocumentTypes(): void {
    // this.personTypeDocumentService.getAll().subscribe(data => {
    //   this.documentTypes = data;
    // });
  }

  loadGenders(): void {
    // this.personGenderService.getAll().subscribe(data => {
    //   this.genders = data;
    // });
  }

  loadPersonData(): void {
    // this.personService.getById(this.personId).subscribe(person => {
    //   this.personForm.patchValue({
    //     id_person_type: person.id_person_type,
    //     id_person_type_document: person.id_person_type_document,
    //     document: person.document,
    //     name: person.name,
    //     last_name_first: person.last_name_first,
    //     last_name_second: person.last_name_second,
    //     blood_type: person.blood_type,
    //     birth_date: this.formatDate(person.birth_date),
    //     id_gender: person.id_gender,
    //     id_status: person.id_status
    //   });
    // });
  }

  private formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().substring(0, 10);
  }

  onSubmit(): void {
    // if (this.personForm.valid) {
    //   const personData = this.personForm.value;

    //   if (this.personId) {
    //     // Actualizar persona existente
    //     this.personService.update(this.personId, personData).subscribe({
    //       next: () => {
    //         this.router.navigate(['/personas']);
    //       },
    //       error: (err) => {
    //         console.error('Error al actualizar persona:', err);
    //       }
    //     });
    //   } else {
    //     // Crear nueva persona
    //     this.personService.create(personData).subscribe({
    //       next: () => {
    //         this.router.navigate(['/personas']);
    //       },
    //       error: (err) => {
    //         console.error('Error al crear persona:', err);
    //       }
    //     });
    //   }
    // }
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