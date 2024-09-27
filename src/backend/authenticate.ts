import { UserData } from "../interfaces/base-response.interface";

export const userToken = (): UserData | null => {
    return JSON.parse(String(localStorage.getItem('user')));
}