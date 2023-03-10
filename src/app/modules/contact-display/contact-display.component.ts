import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeletionConfirmationDialogComponent } from './components/deletion-confirmation-dialog/deletion-confirmation-dialog.component';

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss'],
})
export class ContactDisplayComponent {
  private sort?: Sort;
  private page?: PageEvent;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phoneNumber',
    'actions',
  ];

  searchForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
  });

  contacts: Contact[] = [];
  totalElements: number = 0;
  pageSize: number = 0;

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog
  ) {}

  fetchContacts(): void {
    const formValue = this.searchForm.value;
    this.contactService
      .findContacts(
        formValue.firstName,
        formValue.lastName,
        this.sort,
        this.page
      )
      .subscribe((response) => {
        this.contacts = response._embedded.contacts;
        this.totalElements = response.page.totalElements;
        this.pageSize = response.page.size;
      });
  }

  onSortChange(sort: Sort): void {
    this.sort = sort;
    this.fetchContacts();
  }

  onPageChange(page: PageEvent): void {
    this.page = page;
    this.fetchContacts();
  }

  onDelete(contact: Contact): void {
    const dialogRef = this.dialog.open(DeletionConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.contactService
          .deleteContact(contact)
          .subscribe(() => this.fetchContacts());
      }
    });
  }
}
