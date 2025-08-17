import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setSessionVariable(name: string, value: string): void {
    sessionStorage.setItem(name, value);
  }

  getSessionVariable(name: string): string | null {
    return sessionStorage.getItem(name);
  }

  setSessionObject(name: string, value: any): void {
    sessionStorage.setItem(name, JSON.stringify(value));
  }

  getSessionObject<T>(name: string): T | null {
    const json = sessionStorage.getItem(name);
    if (!json) return null;
    try {
      return JSON.parse(json) as T;
    } catch (e) {
      console.warn(`No se pudo parsear la clave "${name}" del sessionStorage`, e);
      return null;
    }
  }

  removeSessionVariable(name: string): void {
    sessionStorage.removeItem(name);
  }

  clearSession(): void {
    sessionStorage.clear();
  }
}
