import { environment } from "../../enviremoment/environment";

const apiUrl = environment.apiUrl;

export const urlConstants = {

    institucion: `${apiUrl}/api/institucion`,
    login: `${apiUrl}/api/auth`,
    persona: `${apiUrl}/api/persona`,
    personaType: `${apiUrl}/api/PersonType`,
}


export const SessionConstants = {
    token: "token",
    changedPassword: "changedPassword",
    institucion: "institucion",
    loginResponse: "loginResponse"
}