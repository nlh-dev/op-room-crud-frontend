import { ISelect } from "@/components/Selector/Selector.data";
import { z } from "zod";

export interface ICreateUser {
    name: string;
    password: string;
    role: string;
}

export const initialValues: ICreateUser = {
    name: '',
    password: '',
    role: ''
}

export const userValidationSchema = z.object({
    name : z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    password: z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
    role: z.string().refine(text => text !== '', {message: 'El campo es requerido'})
})

export interface IUsersRoles{
    options: ISelect[];
}

export const UserRolesSelector: ISelect[] = [
    {
        selectValue: '1',
        selectLabel: 'Administrador',
    },
    {
        selectValue: '2',
        selectLabel: 'Usuario Estandar',
    },
]