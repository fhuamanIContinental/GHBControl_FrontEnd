import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from '../../../constants/general.constants';
import { Observable } from 'rxjs';
import { AutocompleteResponse } from '../../../models/autocomplete-response.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {

  private url = urlConstants.institucion;
  constructor(
    private http: HttpClient
  ) { }

  listarInstituciones(queryParams?: string): Observable<AutocompleteResponse[]> {
    if (!queryParams) {
      queryParams = "*";
    }
    return this.http.get<AutocompleteResponse[]>(`${this.url}/autocomplete/${queryParams}`);
  }

}
