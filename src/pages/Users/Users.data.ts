import { IColumns } from "@/components/TableComponent/TableComponent.data";

export interface IUsers {
  idNumber: string;
  userName: string;
  passwordUser: string;
  roleUser: string;
}

export const UserColumns: IColumns<IUsers>[] = [
  {
    header: "Usuario",
    column: (data) => data.userName,
    type: "text",
    className: [''],
  },
  {
    header: "Contraseña",
    column: (data) => data.passwordUser,
    type: "text",
    className: [''],
  },
  {
    header: "Rol de Usuario",
    column: (data) => data.roleUser,
    type: "text",
    className: [''],
  },
  {
    header: "Estado",
    type: "select",
    column: () => 'active',
    className: [''],
    selectComponent: [
      {
        selectValue: 'active',
        selectLabel: 'Activo'
      },
      {
        selectValue: 'inactive',
        selectLabel: 'Inactivo',
      },
    ],
  },
  {
    header: "Opciones",
    column: () => '',
    type: "icon",
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

export const dataUsers: IUsers[] = [
    {
        idNumber: '001',
        userName: 'Hector Navarro',
        passwordUser: '27822521',
        roleUser: 'Administrador',
    }
]