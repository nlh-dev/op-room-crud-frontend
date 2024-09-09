import { IColumns } from "@/components/TableComponent/TableComponent.data";

export interface ISpecialities{
    specialityType: string;
}

export const SpecialitiesColumns: IColumns<ISpecialities>[] = [
    {
        header: "Nombre de la Intervención",
        column: (data) => data.specialityType,
        type: 'text',
        className: [''],
    },
    {
        header: 'Opciones',
        column: () => '',
        type: 'icon',
        icons: [
            'fa-solid fa-trash',
         ],
        actionIcons: [ 'Editar', 'Borrar' ],
        className: [
            'bg-red-700 hover:bg-red-800',
        ]
    }
]

export const dataSpecialities: ISpecialities[] = [
    {
        specialityType: "CIRUGÍA GENERAL",
    }
]