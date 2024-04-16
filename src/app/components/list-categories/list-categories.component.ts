import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Category } from '../../models/category/category.model';
import { CategoryService } from '../../services/category/category.service';
import { ICategoryService } from '../../abstract/icategory-service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GUID } from '../../models/guid.model';
import { AddCategoryDialog } from '../add-category/add-category.dialog';
import { firstValueFrom } from 'rxjs';
import { AngularMaterialComponent } from '../../common/angular-material/angular-material.component';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RemoveCategoryDialogComponent } from '../remove-category/remove-category.dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [AngularMaterialComponent, RouterLink, CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule, RemoveCategoryDialogComponent],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss'
})
export class ListCategoriesComponent {
  //#region Properties
  title = 'List of Categories';
  public categories: Category[] = [];
  public newCategory: Category = {} as Category;
  public dataSource = new MatTableDataSource<Category>();
  columns: string[] = ['name', 'visible', 'actions'];
  errorMessage: string | undefined;
  currentIndex = -1;
  searchTerm: string = '';
  public filteredDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();

  //#endregion


  //#region constructor
  categorySvc = inject(CategoryService) as ICategoryService;
  dialog = inject(MatDialog);
  authService = inject(AuthService);
  router = inject(Router);
  //#endregion



  async ngOnInit(): Promise<void> {
    await this.fetchCategories();
    this.filteredDataSource = new MatTableDataSource<Category>(this.categories);
  }

  filterCategories(searchTerm: string) {
    this.filteredDataSource.data = this.dataSource.data.filter((category: Category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }



  async fetchCategories(): Promise<void> {
    try {
      this.categories = await this.categorySvc.getAllCategories();
      console.log("Fetched categories:", this.categories);
      this.dataSource = new MatTableDataSource(this.categories);
      this.filteredDataSource = new MatTableDataSource(this.categories);
    } catch (error) {
      this.errorMessage = 'An error occurred while fetching categories.';
      console.error(error);
    }
  }

  async refreshList(): Promise<void> {
    await this.fetchCategories();
    this.currentIndex = -1;
  }

  setActiveCategory(category: Category, index: number): void {
    this.currentIndex = index;
  }

  async openDialog(): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.newCategory = {} as Category;
    const dialogRef = this.dialog.open(AddCategoryDialog, {
      data: this.newCategory,
    });
    const result: Category = await firstValueFrom(dialogRef.afterClosed());
    if (result && result.name && result.name.length !== 0) {
      try {
        const res = await this.categorySvc.addCategory(result);
        console.log(res);
        this.dataSource.data = [...this.dataSource.data, res];
        this.filteredDataSource.data = this.dataSource.data;
      } catch (e) {
        console.error(e);
        this.errorMessage = 'An error occurred while adding the category. Please try again.';
      }
    }
  }

  async removeCategory(id: GUID): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const categoryToBeRemoved = this.dataSource.data.find(c => c.id === id);
    const dialogRef = this.dialog.open(RemoveCategoryDialogComponent, {
      width: '250px',
      data: { category: categoryToBeRemoved }
    });
    const result = await firstValueFrom(dialogRef.afterClosed()); {
      if (result === true) {
        try {
          const res = await this.categorySvc.deleteCategory(id);
          console.log(res);
          this.dataSource.data = [...this.dataSource.data.filter(c => c.id !== id)];
          this.filteredDataSource.data = this.dataSource.data;
        } catch (e) {
          console.error(e);
          this.errorMessage = 'An error occurred while deleting the category. Please try again.';
        }
      }
    }
  }
}
