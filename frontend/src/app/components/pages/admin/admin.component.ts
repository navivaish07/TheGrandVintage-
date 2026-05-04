import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface Reservation {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  message: string;
  table?: string;
  reservationType?: 'room' | 'table' | 'both';
  roomType?: 'single' | 'double';
  tableCapacity?: string;
}

interface Contact {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  message: string;
}

interface Review {
  _id?: string;
  id?: string;
  name: string;
  rating: number;
  feedback: string;
}

interface MenuItem {
  _id?: string;
  id?: string;
  category: string;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  reservations: Reservation[] = [];
  contacts: Contact[] = [];
  reviews: Review[] = [];
  menuItems: MenuItem[] = [];

  showEditModal = false;
  editingItem: any = null;
  editType: 'reservation' | 'contact' | 'review' | 'menu' | null = null;

  private routerSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated() || !this.authService.isAdminUser()) {
      this.router.navigate(['/home']);
      return;
    }
    this.loadData();

    // Reload data when navigating back to admin page
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/admin') {
          this.loadData();
        }
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadData() {
    this.dataService.getReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
    this.dataService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
    this.dataService.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
    this.dataService.getMenuItems().subscribe(menuItems => {
      this.menuItems = menuItems;
    });
  }

  private categorizeReservationType(res: Reservation): 'room' | 'table' | 'both' {
    if (res.reservationType) {
      return res.reservationType;
    }
    if (res.table && !res.roomType) {
      return 'table';
    }
    if (res.roomType && !res.table) {
      return 'room';
    }
    if (res.table && res.roomType) {
      return 'both';
    }
    return 'room';
  }

  get roomReservations(): Reservation[] {
    return this.reservations.filter(res => {
      const type = this.categorizeReservationType(res);
      return type === 'room' || type === 'both';
    });
  }

  get tableReservations(): Reservation[] {
    return this.reservations.filter(res => {
      const type = this.categorizeReservationType(res);
      return type === 'table' || type === 'both';
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  editReservation(reservation: Reservation) {
    this.editingItem = { ...reservation };
    this.editType = 'reservation';
    this.showEditModal = true;
  }

  editContact(contact: Contact) {
    this.editingItem = { ...contact };
    this.editType = 'contact';
    this.showEditModal = true;
  }

  editReview(review: Review) {
    this.editingItem = { ...review };
    this.editType = 'review';
    this.showEditModal = true;
  }

  saveEdit() {
    if (!this.editingItem || !this.editType) return;

    const id = this.editingItem._id || this.editingItem.id;

    if (this.editType === 'reservation') {
      this.dataService.updateReservation(id, this.editingItem).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else if (this.editType === 'contact') {
      this.dataService.updateContact(id, this.editingItem).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else if (this.editType === 'review') {
      this.dataService.updateReview(id, this.editingItem).subscribe(() => {
        this.loadData();
        this.closeModal();
      });
    } else if (this.editType === 'menu') {
      if (id) {
        this.dataService.updateMenuItem(id, this.editingItem).subscribe(() => {
          this.loadData();
          this.closeModal();
        });
      } else {
        this.dataService.addMenuItem(this.editingItem).subscribe(() => {
          this.loadData();
          this.closeModal();
        });
      }
    }
  }

  deleteReservation(id: string) {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.dataService.deleteReservation(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  deleteContact(id: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.dataService.deleteContact(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  deleteReview(id: string) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.dataService.deleteReview(id).subscribe(() => {
        this.loadData();
      });
    }
  }

  closeModal() {
    this.showEditModal = false;
    this.editingItem = null;
    this.editType = null;
  }

  // Menu Management Methods
  openAddMenuModal() {
    this.editingItem = {
      category: '',
      name: '',
      description: '',
      price: 0,
      image: ''
    };
    this.editType = 'menu';
    this.showEditModal = true;
  }

  editMenuItem(item: MenuItem) {
    this.editingItem = { ...item };
    this.editType = 'menu';
    this.showEditModal = true;
  }

  deleteMenuItem(id: string) {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.dataService.deleteMenuItem(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
