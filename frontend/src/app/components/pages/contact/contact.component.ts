import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  title = 'Contact Us';

  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private dataService: DataService) {}

  submitForm() {
    this.dataService.addContact(this.contact).subscribe({
      next: () => {
        alert('Message sent successfully! We will get back to you soon.');
        this.contact = { name: '', email: '', message: '' };
      },
      error: () => {
        alert('Error sending message. Please try again.');
      }
    });
  }
}
