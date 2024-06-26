import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from "./common/nav-menu/nav-menu.component";
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { HomeComponent } from './common/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsCategoryComponent } from './components/details-category/details-category.component';
import { UserComponent } from './components/user/user.component';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavMenuComponent,
    ListCategoriesComponent,
    HomeComponent,
    HttpClientModule,
    DetailsCategoryComponent,
    UserComponent
  ]
})
export class AppComponent {
  title = 'Sarasvati.Web';
}
