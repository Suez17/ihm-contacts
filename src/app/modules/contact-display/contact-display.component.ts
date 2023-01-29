import {Component} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../models/contact.model";
import {FormControl, FormGroup} from "@angular/forms";

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

  onSubmit() {
    const formValue = this.searchForm.value;
    this.contactService.findAllContacts(formValue.firstName, formValue.lastName)
    .subscribe(response => this.contacts = response._embedded.contacts);
  }
}
