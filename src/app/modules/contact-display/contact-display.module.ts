import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDisplayComponent } from './contact-display.component';
import { ContactTableComponent } from './components/contact-table/contact-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";

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
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSortModule
  ]
})
export class ContactDisplayModule { }
