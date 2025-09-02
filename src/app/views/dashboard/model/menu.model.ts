export interface MenuAplicacionResponse {
    id: number;
    name: string;
    description: string;
    icon: string;
    showMenu: boolean;
    subMenu: SubMenuResponse[];
}


export interface SubMenuResponse {
    id: number;
    name: string;
    description: string;
    icon: string;
    url: string;
}