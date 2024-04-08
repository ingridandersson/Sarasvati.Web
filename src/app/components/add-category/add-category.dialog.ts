import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialComponent } from '../../common/angular-material/angular-material.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ListCategoriesComponent } from '../list-categories/list-categories.component';
import { CategoryService } from '../../services/category/category.service';
import { ICategoryService } from '../../abstract/icategory-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [AngularMaterialComponent, MatFormFieldModule, MatDialogModule, MatInputModule, FormsModule, ListCategoriesComponent, MatButtonModule],
  templateUrl: './add-category.dialog.html',
  styleUrl: './add-category.dialog.scss'
})
export class AddCategoryDialog {
  title = 'Add Category';

  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  service = inject(CategoryService) as ICategoryService;
  errorMessage: string | undefined;

  onNoClick(): void {
    this.dialogRef.close();
  }

  async saveCategory(): Promise<void> {
    try {
      this.data = await this.service.addCategory(this.data);
      console.log(this.data);
      this.dialogRef.close(this.data);
    }
    catch (error) {
      this.errorMessage = 'An error occured while adding a category. Try again!';
      console.error(error);
    }
  }
}