import { Injectable } from '@angular/core';
import { urlConstants } from '../constants/general.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericFilterRequest } from '../models/GenericFilterRequest';
import { GenericFilterResponse } from '../models/GenericFilterResponse';
import { VistaEmpleadoResponse } from '../models/vista-empleado-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {



  private apiUrl = urlConstants.empleado;
  constructor(
    private http: HttpClient,
  ) { }


  getByFilter(filter: GenericFilterRequest): Observable<GenericFilterResponse<VistaEmpleadoResponse>> {
    return this.http.post<GenericFilterResponse<VistaEmpleadoResponse>>(`${this.apiUrl}/filter`, filter);
  }

  //VistaEmpleadoResponse
}
