import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { DetailsCategoryComponent } from './components/details-category/details-category.component';
import { AuthComponent } from './components/auth/auth.component';
import { RessetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard, testGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'categories',
    canMatch: [testGuard],
    component: ListCategoriesComponent
  },
  {
    path: 'category/:id', component: DetailsCategoryComponent
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: AuthComponent },
      { path: 'register', component: AuthComponent },
      { path: 'password/reset', component: RessetPasswordComponent }
    ]
  },
];

export const AppRoutes = RouterModule.forRoot(routes);
