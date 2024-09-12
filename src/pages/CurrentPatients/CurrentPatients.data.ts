import { IColumns } from "@/components/TableComponent/TableComponent.data";

export interface ICPatients{
    fullName: string;
    specialityType: string;
    operatingStartDate: string;
    patientState?: string;
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
        type: 'select',
        className: [''],
        column: () => 'operating',
        selectComponent:[
            {
                selectLabel: 'En Reposo',
                selectValue: 'resting',
            },
            {
                selectLabel: 'En Operacion',
                selectValue: 'operating',
            },
        ]
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
            'bg-green-600 hover:bg-green-700',
            'bg-red-700 hover:bg-red-800',
            'bg-slate-800 hover:bg-slate-900',
        ],
    },
]

export const dataCPatients: ICPatients[] = [
    {
        fullName: 'Hector Navarro',
        specialityType: "Cirugía General",
        operatingStartDate: "13-09-2024",
    }
]