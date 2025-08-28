import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urlConstants } from '../constants/general.constants';
import { AutocompleteResponse } from '../models/autocomplete-response.model';

@Injectable({
  providedIn: 'root'
})
export class PersonGenderService {

  private apiUrl = urlConstants.personaGender;
  constructor(private http: HttpClient) { }


  getAutoComplete(): Observable<AutocompleteResponse[]> {
    return this.http.get<AutocompleteResponse[]>(`${this.apiUrl}/autocomplete`);
  }




}
