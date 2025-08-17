// mantenimiento.routes.ts
import { Routes } from '@angular/router';
import { MantCargoComponent } from './mant-cargo/mant-cargo.component';
import { MantHorarioComponent } from './mant-horario/mant-horario.component';
import { MantPersonaComponent } from './mant-persona/mant-persona.component';
import { MantUsuarioComponent } from './mant-usuario/mant-usuario.component';



export const MANTENIMIENTO_ROUTES: Routes = [
    { path: 'persona', component: MantPersonaComponent },
    { path: 'usuario', component: MantUsuarioComponent },
    { path: 'cargo', component: MantCargoComponent },
    { path: 'horario', component: MantHorarioComponent }
];
