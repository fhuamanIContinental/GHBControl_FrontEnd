import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstitucionService } from './services/institucion.service';
import { AutocompleteResponse } from '../../models/autocomplete-response.model';
import { AutocompleteInputComponent } from '../../shared/autocomplete-input/autocomplete-input.component';
import { SessionService } from '../../services/session.service';
import { LoginRequest } from './models/login.request.model';
import { LoginService } from './services/login.service';
import { SessionConstants } from '../../constants/general.constants';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule, ReactiveFormsModule, AutocompleteInputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  instituciones: AutocompleteResponse[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _institucionService: InstitucionService,
    private _sessionService: SessionService,
    private _loginService: LoginService
  ) {

    this.loginForm = this.fb.group({
      idInstitucion: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  ngOnInit(): void {

    this._institucionService.listarInstituciones().subscribe({
      next: (response: AutocompleteResponse[]) => {
        console.log('Instituciones:', response);
        this.instituciones = response;
      },
      error: (error) => {
        console.error('Error al listar instituciones:', error);
      }
    });
  }

  onInstitucionSeleccionada(institucion: any): void {
    this._sessionService.setSessionVariable('idInstitucion', institucion.id.toString());

    console.log('Institución seleccionada:', institucion);
    this.loginForm.get('idInstitucion')?.setValue(institucion.id);

    // Aquí puedes ejecutar cualquier otra lógica adicional
    // Por ejemplo: cargar datos relacionados, habilitar campos, etc.
  }


  onSubmit(): void {

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Lógica de autenticación aquí
      console.log('Login enviado:', username, password);
      let loginRequest: LoginRequest = new LoginRequest();
      loginRequest.userName = username;
      loginRequest.password = password;
      console.log(loginRequest);
      this._loginService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this._sessionService.setSessionObject(SessionConstants.loginResponse, response);
          this.router.navigate(['/dashboard']);
          // Redirigir o realizar alguna acción después del login exitoso
        },
        error: (error) => {
          console.error('Error en el login:', error);
          // Manejar el error de login, mostrar mensaje al usuario, etc.
        }
      });
    }

  }
}
