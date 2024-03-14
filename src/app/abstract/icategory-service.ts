import { Category } from "../models/category.model";
import { GUID } from "../models/guid.model";

export interface ICategoryService {
    getCategory(id: GUID): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    updateCategory(category: Category): Promise<Category>;
    addCategory(category: Category): Promise<Category>;
    deleteCategory(id: GUID): Promise<Category>;
}
