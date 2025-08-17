import { Injectable } from '@angular/core';
import { urlConstants } from '../../../constants/general.constants';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login.request.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = urlConstants.login;

  constructor(
    private http: HttpClient
  ) { }


  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/web`, request);
  }
}
