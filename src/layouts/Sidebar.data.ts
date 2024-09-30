export interface ISidebar {
    items: string;
    icon: string;
    redirecTo: string;
}

export const SidebarMenu:ISidebar[] = [
    {
        items: "Pacientes Actuales",
        icon: "fa-solid fa-bed mx-2",
        redirecTo: '/pacientes_actuales',
    },
    {
        items: "Pacientes Previos",
        icon: "fa-solid fa-hospital-user mx-2",
        redirecTo: '/pacientes_previos',
    },
    {
        items: "Lista de Intervenciones",
        icon: "fa-brands fa-medrt mx-2",
        redirecTo: '/intervenciones',
    },
    
]