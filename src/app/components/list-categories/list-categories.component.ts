import { Component, inject } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ICategoryService } from '../../abstract/icategory-service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GUID } from '../../models/guid.model';
import { AddCategoryDialog } from '../add-category/add-category.dialog';
import { firstValueFrom } from 'rxjs';
import { AngularMaterialComponent } from '../../common/angular-material/angular-material.component';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [AngularMaterialComponent, RouterLink, MatIconModule, MatTableModule],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss'
})
export class ListCategoriesComponent {
  title = 'List of Categories';
  categorySvc = inject(CategoryService) as ICategoryService;
  dialog = inject(MatDialog);

  public categories: Category[] = [];
  public newCategory: Category = {} as Category;
  public dataSource = new MatTableDataSource<Category>();
  columns: string[] = ['id', 'name', 'visible', 'actions'];
  errorMessage: string | undefined;
  currentIndex = -1;

  async ngOnInit(): Promise<void> {
    await this.fetchCategories();
  }

  async fetchCategories(): Promise<void> {
    try {
      this.categories = await this.categorySvc.getAllCategories();
      console.log(this.categories);
      this.dataSource = new MatTableDataSource(this.categories);
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

  async removeCategory(id: GUID): Promise<void> {
    try {
      const res = await this.categorySvc.deleteCategory(id);
      console.log(res);
      await this.refreshList();
    } catch (e) {
      console.error(e);
      this.errorMessage = 'An error occurred while deleting the category. Please try again.';
    }
  }

  async openDialog(): Promise<void> {
    this.newCategory = {} as Category;
    const dialogRef = this.dialog.open(AddCategoryDialog, {
      data: this.newCategory,
    });

    const result: Category = await firstValueFrom(dialogRef.afterClosed());

    if (result && result.name && result.name.length !== 0) {
      try {
        const res = await this.categorySvc.addCategory(result);
        console.log(res);
        await this.refreshList();
      } catch (e) {
        console.error(e);
        this.errorMessage = 'An error occurred while adding the category. Please try again.';
      }
    }
  }
}