import { IColumns } from "@/components/TableComponent/TableComponent.data";

export interface IPreviousPatients{
    fullName: string;
    specialityType: string;
    operatingDischargeDate: string;
}

export const PrevousPatientsColums: IColumns<IPreviousPatients>[] =[
    {
        header: "Nombre y Apellido",
        column: (data) => data.fullName,
        type: 'text',
        className: [''],
    },
    {
        header: "Tipo de Cirugía",
        column: (data) => data.specialityType,
        type: 'text',
        className: [''],
    },
    {
        header: "Fecha de Egreso",
        column: (data) => data.operatingDischargeDate,
        type: 'text',
        className: [''],
    },
    {
        header: "Opciones",
        column: () => "",
        type: 'icon',
        icons: [
            'fa-solid fa-pen-to-square',
            'fa-solid fa-trash',
        ],
        className: [
            'bg-green-600 hover:bg-green-700',
            'bg-red-700 hover:bg-red-800',
        ],
        actionIcons: ['Editar', 'Borrar'],
    },
]

export const dataPrevousPatients: IPreviousPatients[] = [
    {
        fullName: 'Hector Navarro',
        specialityType: "Cirugía General",
        operatingDischargeDate: "26-09-2024",
    }
]