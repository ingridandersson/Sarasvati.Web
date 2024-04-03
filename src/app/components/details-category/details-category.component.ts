import { Component, inject } from '@angular/core';
import { Category } from '../../models/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ICategoryService } from '../../abstract/icategory-service';
import { GUID, guid } from '../../models/guid.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details-category',
  standalone: true,
  imports: [MatIconModule, MatTableModule, MatButtonModule, ReactiveFormsModule,],
  templateUrl: './details-category.component.html',
  styleUrl: './details-category.component.scss'
})
export class DetailsCategoryComponent {
  title = 'Category Details';
  public category?: Category;
  errorMessage: string | undefined;
  categoryId?: GUID;
  nameControl: FormControl = new FormControl('');

  activatedRoute = inject(ActivatedRoute);
  service = inject(CategoryService) as ICategoryService;
  private location = inject(Location);


  goBack(): void {
    this.location.back();
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
  async save(): Promise<void> {
    if (this.category) {
      this.category.name = this.nameControl.value;
      try {
        await this.service.updateCategory(this.category);
        this.errorMessage = 'Category updated successfully.';
        // window.alert('Category updated successfully.');
      } catch (error) {
        this.errorMessage = 'An error occurred while updating the category.';
        console.error(error);
      }
    }
  }



}
