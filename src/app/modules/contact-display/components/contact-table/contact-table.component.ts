import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from "../../../../models/contact.model";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {

  @Input()
  contacts: Contact[] = [];

  @Input()
  totalElements: number = 0;

  @Output()
  sortEventEmitter = new EventEmitter<Sort>();

  @Output()
  pageEventEmitter = new EventEmitter<PageEvent>();

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber'];

  onSortChange(sort: Sort) {
    this.sortEventEmitter.emit(sort);
  }

  onPageChange(page: PageEvent) {
    this.pageEventEmitter.emit(page);
  }
}
