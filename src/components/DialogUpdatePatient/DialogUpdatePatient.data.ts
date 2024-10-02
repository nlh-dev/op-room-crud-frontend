import { z } from "zod";

export interface IUpdatePatient {
    date_end: Date;
}

export const defaultValues: IUpdatePatient = {
    date_end: new Date(),
}

export const patientUpdateValidationSchema = z.object({
    date_end: z.date({ message: 'El campo es requerido' }),
})

export interface IUpdatePatientDialog {
    open: boolean;
    close: (formUpdate: IUpdatePatient | null) => void;
    text: string;
    value?: Date | null
}