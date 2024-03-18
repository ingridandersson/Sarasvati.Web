import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../../models/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ICategoryService } from '../../abstract/icategory-service';
import { GUID, guid } from '../../models/guid.model';

@Component({
  selector: 'app-details-category',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './details-category.component.html',
  styleUrl: './details-category.component.scss'
})
export class DetailsCategoryComponent {
  title = 'Category Details';
  public category?: Category;
  errorMessage: string | undefined;
  categoryId?: GUID;

  activatedRoute = inject(ActivatedRoute);
  service = inject(CategoryService) as ICategoryService;

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryId = guid(id!);
    this.fetchCategory(this.categoryId);
  }

  async fetchCategory(id: GUID): Promise<void> {
    try {
      this.category = await this.service.getCategory(id);
    } catch (error) {
      this.errorMessage = 'An error occurred while fetching category.';
      console.error(error);
    }
  }
}
