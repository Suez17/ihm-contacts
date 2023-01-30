import {Component} from '@angular/core';
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../models/contact.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber'];

  searchForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  contacts: Contact[] = [];
  totalElements: number = 0;
  pageSize: number = 0;
  sort?: Sort;
  page?: PageEvent;

  constructor(private contactService: ContactService) {
  }

  searchContacts() {
    const formValue = this.searchForm.value;
    this.contactService.findContacts(formValue.firstName, formValue.lastName, this.sort, this.page)
    .subscribe(response => {
      this.contacts = response._embedded.contacts;
      this.totalElements = response.page.totalElements;
      this.pageSize = response.page.size;
    });
  }

  onSortChange(sort: Sort) {
    this.sort = sort;
    this.searchContacts();
  }

  onPageChange(page: PageEvent) {
    this.page = page;
    this.searchContacts();
  }
}
