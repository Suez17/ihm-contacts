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

  editionForm: FormGroup = new FormGroup<any>({});

  constructor(private router: Router, private contactService: ContactService) {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.initEditionForm(state as Contact);
    }
  }

  private initEditionForm(contact: Contact): void {
    this.editionForm = new FormGroup({
      firstName: new FormControl(contact.firstName),
      lastName: new FormControl(contact.lastName),
      birthDate: new FormControl(contact.birthDate),
      address: new FormControl(contact.address),
      email: new FormControl(contact.email),
      phoneNumber: new FormControl(contact.phoneNumber),
      _links: new FormControl(contact._links)
    });
  }

  updateContact(): void {
    if (this.editionForm.valid) {
      this.contactService.updateContact(this.editionForm.value).subscribe();
    }
  }
}
