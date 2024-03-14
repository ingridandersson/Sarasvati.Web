import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialComponent } from '../../common/angular-material/angular-material.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [AngularMaterialComponent, MatFormFieldModule, MatDialogModule, MatInputModule, FormsModule],
  templateUrl: './add-category.dialog.html',
  styleUrl: './add-category.dialog.scss'
})
export class AddCategoryDialog {
  title = 'Add Category';

  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
