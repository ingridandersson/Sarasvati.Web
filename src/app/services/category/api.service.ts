import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category/category.model';
import { GUID } from '../../models/guid.model';
import { environment } from '../environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private categoryUrl: string = environment.baseUrl + 'api/Categories';

  getCategory(id: GUID): Observable<Category> {
    const url = this.categoryUrl + '/GetCategory/' + id;
    return this.http.get<Category>(url);
  }

  getAllCategories(): Observable<Category[]> {
    const url = this.categoryUrl + '/GetAllCategories';
    return this.http.get<Category[]>(url);
  }

  // getVisibleCategories(): Observable<Category[]> {
  //   const url = this.categoryUrl + '/GetVisibleCategories';
  //   return this.http.get<Category[]>(url);
  // }

  updateCategory(category: Category): Observable<Category> {
    const url = this.categoryUrl + '/UpdateCategory';
    return this.http.put<Category>(url, category);
  }

  addCategory(category: Category): Observable<Category> {
    const url = this.categoryUrl + '/AddCategory';
    return this.http.post<Category>(url, category);
  }

  deleteCategory(id: GUID): Observable<Category> {
    const url = this.categoryUrl + '/DeleteCategory/' + id;
    return this.http.delete<Category>(url);
  }
}
