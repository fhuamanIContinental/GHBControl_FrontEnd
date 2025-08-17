// routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'mantenimiento',
                loadChildren: () =>
                    import('./views/mantenimiento/mantenimiento.routes').then(
                        (m) => m.MANTENIMIENTO_ROUTES
                    )
            }
        ]
    }
];
