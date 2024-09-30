import { IColumns } from "@/components/TableComponent/TableComponent.data";
import { IPatient } from "@/interfaces/patients.interface";
import { formatDate } from "@/lib/utils";

export const CPatientsColums: IColumns<IPatient>[] = [
    {
        header: "Nombre y Apellido",
        column: (data) => data.patients_name,
        type: 'text',
        className: [''],
    },
    {
        header: "Tipo de Cirugía",
        column: (data) => data.surgery_type.surgery_type_name,
        type: 'text',
        className: [''],
    },
    {
        header: "Fecha de Ingreso",
        column: (data) => data.patients_started_date ? formatDate(data.patients_started_date) : '',
        type: 'text',
        className: [''],
    },
    {
        header: "Estado",
        type: 'text',
        className: [''],
        column: (data) => data.surgery_states.surgery_state_name.toString(),
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
];