import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Reservation } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservation: Reservation = {
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    message: '',
    table: '',
    reservationType: 'room',
    roomType: 'single',
    tableCapacity: '2 persons'
  };

  roomAvailability = [
    { name: 'Single Bed Room', description: 'Cozy luxury room with vintage charm.', status: 'Available', statusClass: 'available' },
    { name: 'Double Bed Room', description: 'Elegant suite for couples or friends.', status: 'Limited', statusClass: 'limited' }
  ];

  tableAvailability = [
    { name: 'Table for 2', description: 'Intimate seating with premium finishes.', status: 'Available', statusClass: 'available' },
    { name: 'Table for 4', description: 'Spacious table for small groups.', status: 'Available', statusClass: 'available' },
    { name: 'Table for 6', description: 'Luxurious dining space for larger parties.', status: 'Few left', statusClass: 'limited' }
  ];

  priceRates = {
    singleRoom: 2500,
    doubleRoom: 4200,
    tablePerPerson: {
      '2 persons': 1200,
      '4 persons': 1100,
      '6 persons': 1050,
      '8 persons': 950,
    }
  };

  showPaymentStep = false;
  paymentSummary = {
    total: 0,
    advance: 0,
  };

  isProcessingPayment = false;
  paymentComplete = false;
  paymentMessage = '';
  isAuthenticated = false;

  constructor(private dataService: DataService, private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();

    // Listen for auth changes
    window.addEventListener('auth-changed', () => {
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  onSubmit() {
    this.paymentSummary.total = this.calculateReservationCost();
    this.paymentSummary.advance = Math.ceil(this.paymentSummary.total * 0.3);
    this.showPaymentStep = true;
  }

  calculateReservationCost(): number {
    let total = 0;

    if (this.reservation.reservationType !== 'table') {
      total += this.reservation.roomType === 'double' ? this.priceRates.doubleRoom : this.priceRates.singleRoom;
    }

    if (this.reservation.reservationType !== 'room') {
      const capacity = this.reservation.tableCapacity as keyof typeof this.priceRates.tablePerPerson;
      total += this.priceRates.tablePerPerson[capacity] * 1;
    }

    return total;
  }

  formatCurrency(amount: number) {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  }

  resetReservation() {
    this.reservation = {
      name: '',
      email: '',
      date: '',
      time: '',
      guests: 1,
      message: '',
      table: '',
      reservationType: 'room',
      roomType: 'single',
      tableCapacity: '2 persons'
    };
    this.paymentSummary = { total: 0, advance: 0 };
    this.showPaymentStep = false;
    this.paymentComplete = false;
  }

  closeConfirmation() {
    this.paymentComplete = false;
    this.resetReservation();
  }

  openAuthModal() {
    // Emit event to open auth modal
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
  }

  payWithRazorpay() {
    if (!this.isAuthenticated || this.isProcessingPayment) {
      return;
    }

    this.isProcessingPayment = true;
    this.paymentMessage = 'Connecting to Razorpay...';

    setTimeout(() => {
      this.paymentMessage = 'Payment successful. Completing reservation...';

      this.dataService.addReservation(this.reservation).subscribe({
        next: () => {
          this.isProcessingPayment = false;
          this.paymentComplete = true;
          this.paymentMessage = 'Reservation confirmed! Thank you for booking with Grand Vintage.';
        },
        error: () => {
          this.isProcessingPayment = false;
          this.paymentMessage = 'Payment succeeded, but reservation could not be confirmed. Please try again.';
          window.alert('Payment succeeded, but reservation could not be completed. Please try again.');
        }
      });
    }, 2000);
  }
}
