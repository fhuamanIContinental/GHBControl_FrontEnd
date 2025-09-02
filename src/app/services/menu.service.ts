import { Injectable } from '@angular/core';
import { urlConstants } from '../constants/general.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuAplicacionResponse } from '../views/dashboard/model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {



  private apiUrl = urlConstants.menu;
  constructor(
    private http: HttpClient,
  ) { }


  getMenu(): Observable<MenuAplicacionResponse[]> {
    return this.http.get<MenuAplicacionResponse[]>(`${this.apiUrl}/by-role`);
  }

}
