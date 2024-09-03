export interface ISidebar {
    group?: string;
    items: string;
    icon?: string;
    redirecTo: string;
    type: string;
}

export const SidebarMenu:ISidebar[] = [
    {
        group: 'Pacientes',
        items: "Pacientes Actuales",
        icon: "fa-solid fa-bed",
        redirecTo: '/pacientes_actuales',
        type: 'link',
    },
    
]