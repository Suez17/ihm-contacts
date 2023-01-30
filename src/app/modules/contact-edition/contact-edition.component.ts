import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Contact} from "../../models/contact.model";
import {ContactService} from "../../services/contact.service";

@Component({
  selector: 'app-contact-edition',
  templateUrl: './contact-edition.component.html',
  styleUrls: ['./contact-edition.component.scss']
})
export class ContactEditionComponent {

  editionForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    birthDate: new FormControl(),
    address: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    _links: new FormControl()
  });

  constructor(private router: Router, private contactService: ContactService) {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.editionForm.setValue(state as Contact);
    }
  }

  updateContact(): void {
    if (this.editionForm.valid) {
      this.contactService.updateContact(this.editionForm.value as Contact).subscribe();
    }
  }
}
