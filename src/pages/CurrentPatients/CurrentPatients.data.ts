import { IColumns } from "@/components/TableComponent/TableComponent.data";

export interface ICPatients{
    fullName: string;
    specialityType: string;
    operatingStartDate: string;
    patientState: string;
}

export const CPatientsColums: IColumns<ICPatients>[] = [
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
        header: "Fecha de Ingreso",
        column: (data) => data.operatingStartDate,
        type: 'text',
        className: [''],
    },
    {
        header: "Estado",
        column: (data) => data.patientState,
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
            'fa-solid fa-right-from-bracket'
        ],
        actionIcons: ['Editar', 'Borrar', 'Liberar'],
        className: [
            'bg-green-500 hover:bg-green-600',
            'bg-red-700 hover:bg-red-800',
            'release_button',
        ],
    },
]

export const dataCPatients: ICPatients[] = [
    {
        fullName: 'Hector Navarro',
        specialityType: "Cirugía General",
        operatingStartDate: "13-09-2024",
        patientState: 'En Reposo',
    }
]