import {ContactDisplayComponent} from './contact-display.component';
import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from "ng-mocks";
import {MatDialog} from "@angular/material/dialog";
import {Contact} from "../../models/contact.model";
import {ContactService} from "../../services/contact.service";
import {when} from "jest-when";
import {EMPTY, of} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {Sort} from "@angular/material/sort";

describe('ContactDisplayComponent', () => {
  let component: ContactDisplayComponent;
  let fixture: MockedComponentFixture<ContactDisplayComponent>;
  let contactService: ContactService;

  beforeEach(() =>
    MockBuilder(ContactDisplayComponent)
    .mock(ContactService)
    .mock(MatDialog)
    .mock(MatFormFieldModule)
    .mock(MatPaginatorModule)
  );

  beforeEach(() => {
    fixture = MockRender(ContactDisplayComponent, null, false);
    component = fixture.point.componentInstance;
    contactService = ngMocks.findInstance(ContactService);
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
  }

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
});
