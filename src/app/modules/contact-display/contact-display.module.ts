import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDisplayComponent } from './contact-display.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import { DeletionConfirmationDialogComponent } from './components/deletion-confirmation-dialog/deletion-confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    ContactDisplayComponent,
    DeletionConfirmationDialogComponent
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
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    RouterLink
  ]
})
export class ContactDisplayModule { }
