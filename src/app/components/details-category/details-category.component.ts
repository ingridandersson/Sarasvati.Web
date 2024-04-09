import { Component, inject } from '@angular/core';
import { Category } from '../../models/category/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category/category.service';
import { ICategoryService } from '../../abstract/icategory-service';
import { GUID, guid } from '../../models/guid.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-details-category',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, CommonModule],
  templateUrl: './details-category.component.html',
  styleUrl: './details-category.component.scss'
})
export class DetailsCategoryComponent {
  title = 'Category Details';
  public category?: Category;
  errorMessage: string | undefined;
  categoryId?: GUID;
  nameControl: FormControl = new FormControl('');
  public showEditForm = false;
  public showDescription = false;

  activatedRoute = inject(ActivatedRoute);
  service = inject(CategoryService) as ICategoryService;
  router = inject(Router);
  authService = inject(AuthService);

  goBack(): void {
    this.router.navigate(['categories']);
  }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryId = guid(id!);
    await this.fetchCategory(this.categoryId);
    this.nameControl.setValue(this.category?.name);
  }

  async fetchCategory(id: GUID): Promise<void> {
    try {
      this.category = await this.service.getCategory(id);
    } catch (error) {
      this.errorMessage = 'An error occurred while fetching category.';
      console.error(error);
    }
  }

  toggleEditForm(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.showEditForm = !this.showEditForm;
    console.log("Show Edit Form: ", this.showEditForm);
  }

  async save(): Promise<void> {
    if (this.category) {
      this.category.name = this.nameControl.value;
      try {
        await this.service.updateCategory(this.category);
        this.errorMessage = 'Category updated successfully.';
      } catch (error) {
        this.errorMessage = 'An error occurred while updating the category.';
        console.error(error);
      }
    }
  }

  toggleShowDescription(): void {
    this.showDescription = !this.showDescription;
    console.log("Show Description: ", this.showDescription);
  }
}
