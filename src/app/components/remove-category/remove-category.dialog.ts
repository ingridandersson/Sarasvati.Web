import { Component, inject } from '@angular/core';
import { AngularMaterialComponent } from '../../common/angular-material/angular-material.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-remove-category',
  standalone: true,
  imports: [AngularMaterialComponent, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './remove-category.dialog.html',
  styleUrl: './remove-category.dialog.scss'
})
export class RemoveCategoryDialogComponent {
  title = 'Remove Category';
  category: Category;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<RemoveCategoryDialogComponent>) {
    console.log(this.data)
    this.category = this.data.category;
  }

  confirmRemove(): void {
    this.dialogRef.close(true);
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
