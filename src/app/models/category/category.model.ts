import { GUID } from '../guid.model';

export class Category {
    id?: GUID;
    name!: string;
    visible?: boolean = true;
}
