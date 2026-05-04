import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { MenuComponent } from './components/pages/menu/menu.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ReviewsComponent } from './components/pages/reviews/reviews.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ReservationsComponent } from './components/pages/reservations/reservations.component';
import { AdminComponent } from './components/pages/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent }
];
