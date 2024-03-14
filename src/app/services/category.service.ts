import { firstValueFrom } from 'rxjs';
import { ICategoryService } from '../abstract/icategory-service';
import { Category } from '../models/category.model';
import { ApiService } from './api.service';
import { Injectable, inject } from '@angular/core';
import { GUID } from '../models/guid.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  apiSvc = inject(ApiService);

  getCategory(id: GUID): Promise<Category> {
    return firstValueFrom(this.apiSvc.getCategory(id));
  }

  getAllCategories(): Promise<Category[]> {
    return firstValueFrom(this.apiSvc.getAllCategories());
  }

  updateCategory(category: Category): Promise<Category> {
    return firstValueFrom(this.apiSvc.updateCategory(category));
  }

  addCategory(category: Category): Promise<Category> {
    return firstValueFrom(this.apiSvc.addCategory(category));
  }

  deleteCategory(id: GUID): Promise<Category> {
    return firstValueFrom(this.apiSvc.deleteCategory(id));
  }
}
