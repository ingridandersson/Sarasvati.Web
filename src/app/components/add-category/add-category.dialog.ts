import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [],
  templateUrl: './add-category.dialog.html',
  styleUrl: './add-category.dialog.scss'
})
export class AddCategoryDialog {
  caption = 'Add Category';

  matDialogRef = inject(MatDialogRef);
  matDialogData = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.matDialogRef.close();
  }
}
