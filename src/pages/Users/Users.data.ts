import { IColumns } from "@/components/TableComponent/TableComponent.data";
import { IUserData } from "@/interfaces/base-response.interface";
import { capitalizeString } from "@/lib/utils";

export const UserColumns: IColumns<IUserData>[] = [
  {
    header: "Usuario",
    column: (data) => capitalizeString(data.op_users),
    type: "text",
    className: [''],
  },
  {
    header: "Contraseña",
    column: (data) => data.op_users_password,
    type: "text",
    className: [''],
  },
  {
    header: "Rol de Usuario",
    column: (data) => data.roles.roles_name,
    type: "text",
    className: [''],
  },
  {
    header: "Estado",
    type: "select",
    column: (data) => data.op_users_state.toString(),
    className: [''],
    selectComponent: [
      {
        selectValue: 'true',
        selectLabel: 'Activo'
      },
      {
        selectValue: 'false',
        selectLabel: 'Inactivo',
      },
    ],
  },
  {
    header: "Opciones",
    column: () => '',
    type: "icon",
    actionIcons: ['edit', 'delete'],
    icons: [
        'fa-solid fa-pen-to-square',
        'fa-solid fa-trash',
    ],
    className: [
        'bg-green-600 hover:bg-green-700',
        'bg-red-700 hover:bg-red-800',
    ],
  }
];