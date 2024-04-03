import { Component, inject } from '@angular/core';
import { AngularMaterialComponent } from '../../common/angular-material/angular-material.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ICategoryService } from '../../abstract/icategory-service';

@Component({
  selector: 'app-remove-category',
  standalone: true,
  imports: [AngularMaterialComponent, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './remove-category.dialog.html',
  styleUrl: './remove-category.dialog.scss'
})
export class RemoveCategoryDialogComponent {
  title = 'Remove Category';
  //to do Two-way binding for the dialog : category name

  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  service = inject(CategoryService) as ICategoryService;
  errorMessage: string | undefined;

  confirmRemove(): void {

    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
