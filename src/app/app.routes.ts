import { Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { DetailsCategoryComponent } from './components/details-category/details-category.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'categories', component: ListCategoriesComponent },
    { path: 'category/:id',component: DetailsCategoryComponent}
];

