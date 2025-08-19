import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from '../constants/general.constants';
import { GenericFilterRequest } from '../models/GenericFilterRequest';
import { GenericFilterResponse } from '../models/GenericFilterResponse';
import { VistaPersonaResponse } from '../models/VistaPersonaResponse';


@Injectable({
  providedIn: 'root'
})
export class MantPersonaService {

  private apiUrl = urlConstants.persona;
  constructor(
    private http: HttpClient,
  ) { }


  getByFilter(filter: GenericFilterRequest): Observable<GenericFilterResponse<VistaPersonaResponse>> {
    return this.http.post<GenericFilterResponse<VistaPersonaResponse>>(`${this.apiUrl}/filter`, filter);
  }

}
