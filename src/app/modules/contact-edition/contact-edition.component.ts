import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Contact} from "../../models/contact.model";
import {ContactService} from "../../services/contact.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contact-edition',
  templateUrl: './contact-edition.component.html',
  styleUrls: ['./contact-edition.component.scss']
})
export class ContactEditionComponent {

  private static readonly SUCCESS = "Success";
  private static readonly ERROR = "Error";

  editMode = false;
  editionForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    birthDate: new FormControl(),
    address: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    _links: new FormControl()
  });

  constructor(private router: Router, private contactService: ContactService, private snackBar: MatSnackBar) {
    const navigation = router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state) {
      this.editionForm.setValue(state as Contact);
      this.editMode = true;
    }
  }

  onSubmit(): void {
    if (this.editionForm.valid) {
      const contact = this.editionForm.value as Contact;
      let request: Observable<any>;
      if (contact._links) {
        request = this.contactService.updateContact(contact);
      } else {
        request = this.contactService.createContact(contact);
      }
      request.subscribe({
        next: () => this.notification(ContactEditionComponent.SUCCESS),
        error: () => this.notification(ContactEditionComponent.ERROR)
      });
    }
  }

  private notification(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 3000
    });
  }
}
