import {Component, Input} from '@angular/core';
import {Contact} from "../../../../models/contact.model";

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {

  @Input()
  contacts: Contact[] = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber'];
}
