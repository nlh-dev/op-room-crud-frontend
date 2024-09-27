export interface BaseResponse {
    success: boolean;
    message: string;
    statusCode: number;
}

export interface BadResponse {
    message: string;
    error: string;
    statusCode: number;
}

export interface ResponseLogin extends BaseResponse {
    user: UserData;
}

export interface UserData {
    id: number;
    op_users: string;
    op_users_password: string;
    op_users_role: number;
    op_users_state: boolean;
    roles: Roles;
}

export interface Roles {
    roles_id: number;
    roles_name: typeRoles;
}

export type typeRoles = 'Administrador' | 'Usuario Estándar';