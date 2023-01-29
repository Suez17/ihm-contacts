import {Component} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../models/contact.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent {

  searchForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
  }

  searchContacts(sort?: Sort) {
    const formValue = this.searchForm.value;
    this.contactService.findContacts(formValue.firstName, formValue.lastName, sort)
    .subscribe(response => this.contacts = response._embedded.contacts);
  }
}
