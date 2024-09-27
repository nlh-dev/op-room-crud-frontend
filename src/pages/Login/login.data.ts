import { z } from "zod";

export interface ILogin {
    username: string;
    password: string;
}

export const defaultValues: ILogin = {
    username: '',
    password: ''
}

export const loginValidationSchema = z.object({
    username : z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    password: z.string().refine(text => text !== '', {message: 'El campo es requerido'})
})