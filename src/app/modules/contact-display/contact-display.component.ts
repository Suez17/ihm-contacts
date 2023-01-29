import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../models/contact.model";

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.findAllContacts().subscribe(response => this.contacts = response._embedded.contacts);
  }
}
