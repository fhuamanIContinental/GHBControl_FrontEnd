import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/session.service';
import { NotificationService } from './../services/notification.service';
import { SessionConstants } from '../constants/general.constants';
import { alert_error } from '../function/alert.function';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const sessionService = inject(SessionService);
    const notificationService = inject(NotificationService);

    const token = sessionService.getSessionVariable(SessionConstants.token);
    let institucion_id = sessionService.getSessionVariable(SessionConstants.institucion) || '0';

    const headers: Record<string, string> = { Institucion: institucion_id };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    req = req.clone({ setHeaders: headers });

    return next(req).pipe(
        map(event => {
            if (event.type === HttpEventType.Response) {
                const response = event as HttpResponse<any>;
                const body = response.body;

                if (body && typeof body === 'object') {
                    const { success, showAlert, titleMessage, textMessage, content } = body;

                    if (success && showAlert) {
                        notificationService.success(titleMessage, textMessage);
                    }

                    if (!success && showAlert) {
                        notificationService.warning(titleMessage, textMessage);
                        // Puedes retornar un observable vacío si no quieres romper el flujo
                        throw new Error(textMessage);
                    }

                    return response.clone({ body: content });
                }
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
            switch (error.status) {
                case 400:
                    alert_error("PETICIÓN INVÁLIDA", "DATOS ENVIADOS DE FORMA INCORRECTA");
                    break;
                case 401:
                    alert_error("SESIÓN INVÁLIDA", "INICIE SESIÓN O INGRESE NUEVAMENTE");
                    break;
                case 403:
                    alert_error("ACCIÓN NO PERMITIDA", "PERMISOS INSUFICIENTES");
                    break;
                case 500:
                    alert_error("OCURRIÓ UN ERROR", "INTÉNTELO MÁS TARDE");
                    break;
                case 0:
                    alert_error("SIN CONEXIÓN", "No podemos conectarnos al servicio");
                    break;
                default:
                    alert_error("ERROR", "Algo salió mal");
            }
            return throwError(() => error);
        })
    );
};
