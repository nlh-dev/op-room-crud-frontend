import { IUserData } from "@/interfaces/base-response.interface";

export const userToken = (): IUserData => {
    return JSON.parse(String(localStorage.getItem('user')));
}