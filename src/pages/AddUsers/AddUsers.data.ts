import { ISelect } from "@/components/Selector/Selector.data";

export interface IUsersRoles{
    options: ISelect[];
}

export const UserRolesSelector: ISelect[] = [
    {
        selectValue: 'admin',
        selectLabel: 'Administrador',
        className: 'w-[300px]',
    },
    {
        selectValue: 'user',
        selectLabel: 'Usuario Estandar',
    },
]