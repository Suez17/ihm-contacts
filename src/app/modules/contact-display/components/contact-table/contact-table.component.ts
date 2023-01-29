import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from "../../../../models/contact.model";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent {

  @Input()
  contacts: Contact[] = [];

  @Output()
  sortEventEmitter = new EventEmitter<Sort>();

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber'];

  onSortChange(sort: Sort) {
    this.sortEventEmitter.emit(sort);
  }
}
