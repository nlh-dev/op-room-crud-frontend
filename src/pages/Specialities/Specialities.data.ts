import { IColumns } from "@/components/TableComponent/TableComponent.data";
import { ISpecialites } from "@/interfaces/specialities.interface";


export const SpecialitiesColumns: IColumns<ISpecialites>[] = [
    {
        header: "Nombre de la Intervención",
        column: (data) => data.surgery_type_name,
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
        actionIcons: ['Editar', 'Borrar'],
        className: [
            'bg-red-700 hover:bg-red-800',
        ]
    }
];