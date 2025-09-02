import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SHARED_MANT_IMPORTS } from '../../../shared/shared-mant';
import { VistaEmpleadoResponse } from '../../../models/vista-empleado-response.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';
import { GenericFilterRequest } from '../../../models/GenericFilterRequest';
import { GenericFilterResponse } from '../../../models/GenericFilterResponse';

@Component({
  selector: 'app-mant-empleado',
  imports: [
    SHARED_MANT_IMPORTS
  ],
  templateUrl: './mant-empleado.component.html',
  styleUrl: './mant-empleado.component.scss'
})
export class MantEmpleadoComponent implements OnInit {

  visible: boolean = false;
  empleados: VistaEmpleadoResponse[] = [];
  totalItems: number = 0;
  loading: boolean = false;
  formFilter: FormGroup;
  filter: GenericFilterRequest = new GenericFilterRequest();

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService
  ) {
    this.formFilter = this.fb.group({
      fullname: ['', []],
      document: ['', []],
    });
  }
  ngOnInit(): void {
    this.filter.quantity = 2;
    this.getAllFilter();
  }


  onPageChanged(event: any) {
    this.loading = true;
    this.filter.page = Math.floor(event.first / event.rows) + 1; // página 1-based
    this.getAllFilter();
    this.cdr.detectChanges();
    // this.filter.page = page;
    // this.listarPersonas(); // método que obtiene la data paginada
  }

  getAllFilter() {
    this._empleadoService.getByFilter(this.filter).subscribe({
      next: (data: GenericFilterResponse<VistaEmpleadoResponse>) => {
        this.empleados = data.list;
        this.totalItems = data.totalRecord;
        this.loading = false;
        console.log("empleados", data);

      },
      error: (error) => { console.error('Error fetching menu:', error); },
    });
  }


  editItem(item: any) {

  }
  btnLimpiar() {

  }
  btnBuscar() { }
  addItem() { }
}
