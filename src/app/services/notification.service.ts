import { Injectable } from '@angular/core';
import * as toastr from 'toastr'; // Importa toastr desde el paquete instalado

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
    toastr.options.closeButton = true;
    toastr.options.progressBar = true;
    toastr.options.timeOut = 2000;
    toastr.options.positionClass = 'toast-top-right';
  }

  success(title: string, message: string): void {
    toastr.success(message, title);
  }

  error(title: string, message: string): void {
    toastr.error(message, title);
  }

  warning(title: string, message: string): void {
    toastr.warning(message, title);
  }

  info(title: string, message: string): void {
    toastr.info(message, title);
  }
}

/*

[{
  "resource": "/g:/GHB/CicloudV3/ghbControl/src/app/services/notification.service.ts",
  "owner": "typescript",
  "code": "7016",
  "severity": 8,
  "message": "Could not find a declaration file for module 'toastr'. 
  'g:/GHB/CicloudV3/ghbControl/node_modules/toastr/toastr.js' implicitly has an 'any' type.
  \n  Try `npm i --save-dev @types/toastr` if it exists or add a new declaration (.d.ts) file containing `declare module 'toastr';`",
  "source": "ts",
  "startLineNumber": 2,
  "startColumn": 25,
  "endLineNumber": 2,
  "endColumn": 33,
  "origin": "extHost1"
}]

[{
  "resource": "/g:/GHB/CicloudV3/ghbControl/src/app/services/notification.service.ts",
  "owner": "typescript",
  "code": "7016",
  "severity": 8,
  "message": "Could not find a declaration file for module 'toastr'. 'g:/GHB/CicloudV3/ghbControl/node_modules/toastr/toastr.js' implicitly has an 'any' type.\n  Try `npm i --save-dev @types/toastr` if it exists or add a new declaration (.d.ts) file containing `declare module 'toastr';`",
  "source": "ts",
  "startLineNumber": 2,
  "startColumn": 25,
  "endLineNumber": 2,
  "endColumn": 33,
  "origin": "extHost1"
}]
*/
