import {ContactDisplayComponent} from './contact-display.component';
import {
  MockBuilder,
  MockedComponentFixture,
  MockInstance,
  MockRender,
  MockService,
  ngMocks
} from "ng-mocks";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Contact} from "../../models/contact.model";
import {ContactService} from "../../services/contact.service";
import {when} from "jest-when";
import {EMPTY, of} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";

describe('ContactDisplayComponent', () => {
  let component: ContactDisplayComponent;
  let fixture: MockedComponentFixture<ContactDisplayComponent>;
  let contactService: ContactService;
  let matDialog: MatDialog;

  beforeEach(() =>
    MockBuilder(ContactDisplayComponent)
    .mock(ContactService)
    .mock(MatDialog)
    .mock(MatFormFieldModule)
    .mock(MatPaginatorModule)
    .mock(ReactiveFormsModule)
    .mock(MatTableModule)
  );

  beforeEach(() => {
    fixture = MockRender(ContactDisplayComponent);
    component = fixture.point.componentInstance;
    contactService = ngMocks.findInstance(ContactService);
    matDialog = ngMocks.findInstance(MatDialog);
  });

  const firstName = "dummyFirstName";
  const lastName = "dummyLastName";
  const contact: Contact = {
    firstName,
    lastName,
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

  describe('test fetchContacts', () => {
    it('should set contacts', () => {
      // Given
      component.searchForm.setValue({firstName, lastName});

      when(contactService.findContacts)
      .calledWith(firstName, lastName, undefined, undefined)
      .mockReturnValue(of({
        _embedded: {
          contacts: [contact]
        },
        page: {
          size: 20,
          totalElements: 9
        }
      }));

      // When
      component.fetchContacts();

      // Then
      expect(component.contacts).toEqual([contact]);
      expect(component.pageSize).toBe(20);
      expect(component.totalElements).toBe(9);
    });
  });

  describe('test onSortChange', () => {
    it('should set sort attribute', () => {
      // Given
      const sort: Sort = {
        active: 'firstName',
        direction: 'asc'
      };

      when(contactService.findContacts).mockReturnValue(EMPTY);

      const spyFetchContrats = jest.spyOn(component, 'fetchContacts');

      // When
      component.onSortChange(sort);

      // Then
      expect(component['sort']).toBe(sort);
      expect(spyFetchContrats).toHaveBeenCalled();
    })
  });

  describe('test onPageChange', () => {
    it('should set page attribute', () => {
      // Given
      const page: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 20
      };

      when(contactService.findContacts).mockReturnValue(EMPTY);

      const spyFetchContrats = jest.spyOn(component, 'fetchContacts');

      // When
      component.onPageChange(page);

      // Then
      expect(component['page']).toBe(page);
      expect(spyFetchContrats).toHaveBeenCalled();
    })
  });

  describe('test onDelete', () => {
    it('should open dialog and delete contact', () => {
      // Given
      const matDialogRef = MockService(MatDialogRef);
      when(matDialog.open).mockReturnValue(matDialogRef);
      when(matDialogRef.afterClosed).mockReturnValue(of(true));

      when(contactService.deleteContact)
      .calledWith(contact)
      .mockReturnValue(of({}));

      when(contactService.findContacts).mockReturnValue(EMPTY);
      const spyFetchContrats = jest.spyOn(component, 'fetchContacts');

      // When
      component.onDelete(contact);

      // Then
      expect(spyFetchContrats).toHaveBeenCalled();
    })
  });
});
