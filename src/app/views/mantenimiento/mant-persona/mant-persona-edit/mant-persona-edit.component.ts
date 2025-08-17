import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonGenderService } from '../services/person-gender.service';
import { PersonTypeDocumentService } from '../services/person-type-document.service';
import { PersonTypeService } from '../services/person-type.service';
import { PersonService } from '../services/person.service';
import { SHARED_MANT_IMPORTS } from '../../../../shared/shared-mant';


@Component({
  selector: 'app-mant-persona-edit',
  imports: [ReactiveFormsModule, SHARED_MANT_IMPORTS],
  templateUrl: './mant-persona-edit.component.html',
  styleUrl: './mant-persona-edit.component.scss'
})
export class MantPersonaEditComponent implements OnInit {

  @Input() data: any;


  personForm: FormGroup;
  personId: number = 0;
  personTypes: any[] = [];
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
      id_person_type: ['', Validators.required],
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
    console.log(this.data.itemSelected);
    this.personId = this.route.snapshot.params['id'];

    const item = { ...this.data.itemSelected };
    if (item.birthDate) {
      this.data.itemSelected = this.formatDate(item.birthDate);
    }

    // Cargar datos de combos
    this.loadPersonTypes();
    this.loadDocumentTypes();
    this.loadGenders();

    if (this.personId) {
      this.loadPersonData();
    }
    this.personForm.patchValue(this.data.itemSelected);
  }




  loadPersonTypes(): void {
    // this.personTypeService.getAll().subscribe(data => {
    //   this.personTypes = data;
    // });
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
}