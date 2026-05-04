import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  title = 'Contact Us';

  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitForm() {
    // Handle form submission
    console.log('Form submitted:', this.contact);
    // Reset form or send data to service
  }
}
