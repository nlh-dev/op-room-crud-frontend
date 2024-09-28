import { z } from "zod";

export interface ICreateSpeciality {
    speciality: string;
}

export const initialValues: ICreateSpeciality = {
    speciality: '',
}

export const specialityValidationSchema = z.object({
    speciality : z.string().refine(text => text !== '', {message: 'El campo es requerido'}),
})
