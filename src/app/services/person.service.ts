import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { urlConstants } from '../constants/general.constants';
import { GenericFilterRequest } from '../models/GenericFilterRequest';
import { GenericFilterResponse } from '../models/GenericFilterResponse';
import { VistaPersonaResponse } from '../models/VistaPersonaResponse';
import { AutocompleteResponse } from '../models/autocomplete-response.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = urlConstants.persona;
  constructor(
    private http: HttpClient,
  ) { }


  getByFilter(filter: GenericFilterRequest): Observable<GenericFilterResponse<VistaPersonaResponse>> {
    return this.http.post<GenericFilterResponse<VistaPersonaResponse>>(`${this.apiUrl}/filter`, filter);
  }

  getStatus(): Observable<AutocompleteResponse[]> {
    // Simulamos una respuesta (como si viniera de la API)
    const response: AutocompleteResponse[] = [
      { id: 1, text: 'Activo' },
      { id: 2, text: 'Inactivo' },
      { id: 3, text: 'Pendiente' }
    ];

    // Retornamos un observable
    return of(response);
  }


}
