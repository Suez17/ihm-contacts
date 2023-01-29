import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDisplayComponent } from './contact-display.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    ContactDisplayComponent,
    ContactTableComponent
  ],
  exports: [
    ContactDisplayComponent
  ],
  imports: [
    CommonModule,
    MatTableModule
  ]
})
export class ContactDisplayModule { }
