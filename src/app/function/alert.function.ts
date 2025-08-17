import Swal from 'sweetalert2';

export function alert_success(title: string, message: string, timer?: number,) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        position: 'top-end',
        showConfirmButton: false,
        timer: timer == null || timer == undefined ? 1500 : timer
    });
}


export function alert_warning(title: string, message: string, timer?: number) {
    Swal.fire({
        //position: 'top-end',
        icon: 'warning',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: timer == null || timer == undefined ? 3000 : timer
    });
}

export function alert_error(title: string, message: string, timer?: number) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        showConfirmButton: false,
        timer: timer == null || timer == undefined ? 3000 : timer
    });
}


export async function alert_delete(title: string, message: string) {
    const result = await Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si, Eliminar'
    });
    return result.isConfirmed;
}

export async function alert_confirm(title: string, message: string) {
    const result = await Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: "Cancelar"

    });

    return result.isConfirmed;

}