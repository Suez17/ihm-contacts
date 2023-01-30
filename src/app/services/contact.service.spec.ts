import {ContactService} from './contact.service';
import {HttpClient, HttpParams} from "@angular/common/http";
import {MockBuilder, ngMocks} from "ng-mocks";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {Contact} from "../models/contact.model";

describe('ContactService', () => {

  let httpMock: HttpClient;
  let service: ContactService;

  beforeEach(() => MockBuilder(ContactService).mock(HttpClient));

  beforeEach(() => {
    service = ngMocks.findInstance(ContactService);
    httpMock = ngMocks.findInstance(HttpClient);
  });

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
  }

  describe('test findContacts', () => {
    it('should call GET /contacts', () => {
      // Given
      const firstName = 'dummyFirstName';
      const lastName = 'dummyLastName';
      const sort: Sort = {
        active: 'firstName',
        direction: 'asc'
      };

      const page: PageEvent = {
        pageIndex: 1,
        pageSize: 10,
        length: 20
      };

      // When
      service.findContacts(firstName, lastName, sort, page);

      // Then
      const params = new HttpParams()
      .append("firstName", firstName)
      .append("lastName", lastName)
      .append("sort", 'firstName,asc')
      .append("page", 1);

      expect(httpMock.get).toBeCalledWith("/contacts", {params});
    });
  });

  describe('test createContact', () => {
    it('should call POST /contacts', () => {
      // When
      service.createContact(contact);

      // Then
      expect(httpMock.post).toBeCalledWith('/contacts', contact);
    });
  });

  describe('test updateContact', () => {
    it('should call PUT with resource url', () => {
      // When
      service.updateContact(contact);

      // Then
      expect(httpMock.put).toBeCalledWith('/resource-url', contact);
    });
  });

  describe('test deleteContact', () => {
    it('should call DELETE with resource url', () => {
      // When
      service.deleteContact(contact);

      // Then
      expect(httpMock.delete).toBeCalledWith('/resource-url');
    });
  });
});
