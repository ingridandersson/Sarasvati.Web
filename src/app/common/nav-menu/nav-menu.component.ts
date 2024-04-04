import { Component } from '@angular/core';
import { AngularMaterialComponent } from '../angular-material/angular-material.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [AngularMaterialComponent, MatToolbarModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
}
