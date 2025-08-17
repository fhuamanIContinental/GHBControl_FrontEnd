import { ItemFilterRequest } from "./ItemFilterRequest";

export class GenericFilterRequest {
    page: number = 1;
    quantity: number = 10;
    filters: ItemFilterRequest[] = [];
}