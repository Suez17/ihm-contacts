import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditionComponent } from './contact-edition.component';
import {ContactDisplayComponent} from "../contact-display/contact-display.component";
import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from "ng-mocks";
import {ContactService} from "../../services/contact.service";
import {MatDialog} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Contact} from "../../models/contact.model";
import {MatDatepicker, MatDatepickerModule} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {when} from "jest-when";
import {of} from "rxjs";

describe('ContactEditionComponent', () => {
  let component: ContactEditionComponent;
  let fixture: MockedComponentFixture<ContactEditionComponent>;
  let contactService: ContactService;
  let snackBar: MatSnackBar;

  const contact: Contact = {
    firstName: "dummyFirstName",
    lastName: "dummyLastName",
    birthDate: new Date(),
    address: "dummyAddress",
    email: "dummy@email.com",
    phoneNumber: "000",
    _links: {
      contact: {
        href: '/resource-url'
      }
    }
  };

  const navigation: any = {
    extras: {
      state: contact
    }
  };

  beforeEach(() =>
    MockBuilder(ContactEditionComponent)
    .mock(ContactService)
    .mock(MatFormFieldModule)
    .mock(MatDatepickerModule)
    .mock(MatFormFieldModule)
    .mock(Router, {
      getCurrentNavigation: () => navigation
    })
    .mock(MatSnackBar)
    .mock(ReactiveFormsModule)
  );

  beforeEach(() => {
    fixture = MockRender(ContactEditionComponent);
    component = fixture.point.componentInstance;
    contactService = ngMocks.findInstance(ContactService);
    snackBar = ngMocks.findInstance(MatSnackBar);
  });

  describe('test constructor', () => {
    it('should get state of current navigation and set form value', () => {
      expect(component.editMode).toBeTruthy();
      expect(component.editionForm.getRawValue()).toEqual(contact);
    })
  });

  describe('test onSubmit', () => {
    it('should update a contact and display notification when there is a resource url', () => {
      // Given
      component.editionForm.setValue(contact);

      when(contactService.updateContact)
        .calledWith(contact)
        .mockReturnValue(of({}));

      // When
      component.onSubmit();

      // Then
      expect(snackBar.open).toHaveBeenCalled();
    });

    it('should create a contact and display notification when there is no a resource url', () => {
      // Given
      const contactWithoutResourceUrl = {...contact};
      contactWithoutResourceUrl._links = null;

      component.editionForm.setValue(contactWithoutResourceUrl);

      when(contactService.createContact)
      .calledWith(contactWithoutResourceUrl)
      .mockReturnValue(of({}));

      // When
      component.onSubmit();

      // Then
      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
