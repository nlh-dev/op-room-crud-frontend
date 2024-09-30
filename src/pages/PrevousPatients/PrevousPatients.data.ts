import { IColumns } from "@/components/TableComponent/TableComponent.data";
import { IPatient } from "@/interfaces/patients.interface";
import { formatDate } from "@/lib/utils";

export const PrevousPatientsColums: IColumns<IPatient>[] =[
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
        header: "Fecha de Egreso",
        column: (data) => data.patients_updated_date ? formatDate(data.patients_updated_date) : '',
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