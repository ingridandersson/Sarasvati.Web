import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ICategoryService } from '../../abstract/icategory-service';
import { Category } from '../../models/category/category.model';
import { ApiService } from './api.service';
import { Injectable, inject } from '@angular/core';
import { GUID } from '../../models/guid.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService {

  apiSvc = inject(ApiService);

  async getCategory(id: GUID): Promise<Category> {
    return await firstValueFrom(this.apiSvc.getCategory(id));
  }

  async getAllCategories(): Promise<Category[]> {
    return await firstValueFrom(this.apiSvc.getAllCategories());
  }

  async updateCategory(category: Category): Promise<Category> {
    return await firstValueFrom(this.apiSvc.updateCategory(category));
  }

  async addCategory(category: Category): Promise<Category> {
    return await firstValueFrom(this.apiSvc.addCategory(category));
  }

  async deleteCategory(id: GUID): Promise<Category> {
    return await firstValueFrom(this.apiSvc.deleteCategory(id));
  }
}
