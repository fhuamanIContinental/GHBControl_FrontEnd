import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstants } from '../constants/general.constants';
import { AutocompleteResponse } from '../models/autocomplete-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonTypeDocumentService {


  private apiUrl = urlConstants.personaTypeDocument;
  constructor(private http: HttpClient) { }


  getAutoComplete(): Observable<AutocompleteResponse[]> {
    return this.http.get<AutocompleteResponse[]>(`${this.apiUrl}/autocomplete`);
  }


}
