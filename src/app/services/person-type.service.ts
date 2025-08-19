import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { urlConstants } from '../constants/general.constants';
import { Observable } from 'rxjs';
import { PersonTypeResponse } from '../models/person-type-response.model';
import { AutocompleteResponse } from '../models/autocomplete-response.model';

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {


  private apiUrl = urlConstants.personaType;
  constructor(private http: HttpClient) { }

  getAll(): Observable<PersonTypeResponse[]> {
    return this.http.get<PersonTypeResponse[]>(this.apiUrl);
  }

  getAutoComplete(): Observable<AutocompleteResponse[]> {
    return this.http.get<AutocompleteResponse[]>(`${this.apiUrl}/autocomplete/*`);
  }


}
