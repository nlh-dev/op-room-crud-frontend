import { z } from "zod";
export interface ICreatePatient {
    fullName: string;
    speciality: string;
    date_start: Date;
    state: string;
}

export const initialValues: ICreatePatient = {
    fullName: '',
    speciality: '',
    date_start: new Date(),
    state: ''
}

export const patientValidationSchema = z.object({
    fullName: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    speciality: z.string().refine(text => text !== '', { message: 'El campo es requerido' }),
    date_start: z.date({ message: 'El campo es requerido' }),
    state: z.string().refine(text => text !== '', { message: 'El campo es requerido' })
})