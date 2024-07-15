import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContactService} from "../../services/contact.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit{

  contactForm =  this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
    message: ['', Validators.required],
    phone: ['']
  })
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private contactService: ContactService) {
  }
  ngOnInit() {
    this.sendContacts();
  }

  sendContacts() {
    if(this.contactForm.value.name && this.contactForm.value.email && this.contactForm.value.message) {

      this.contactService.sendContact(this.contactForm.value.name,
        this.contactForm.value.email,
        this.contactForm.value.message,
        this.contactForm.value.phone ? this.contactForm.value.phone : '')
        .subscribe({
          next: (response: DefaultResponseType) => {
            if(response.success === 0) {
              this._snackBar.open('Sorry there was an Error your data isn ot sent try again please');
              throw new Error(response.message);
            } else {
              this._snackBar.open(response.message);
              this.contactForm.reset();
            }
            console.log(response);
          },
          error: (error: HttpErrorResponse) => {
            throw new Error(error.message)
          }
        })
    }
  }
}
