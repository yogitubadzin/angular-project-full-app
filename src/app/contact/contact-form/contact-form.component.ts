import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  contactForm = this.fb.group({
    email: this.fb.control('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    message: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]),
  });

  showSummary: boolean;
  showError: boolean;

  constructor(private contactService: ContactService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    this.contactService
      .sendMessage({
        email: this.email.value,
        message: this.message.value,
      })
      .subscribe(
        () => {
          this.showError = false;
          this.showSummary = true;
        },
        () => {
          this.showError = true;
        }
      );
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }
}
