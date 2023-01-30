import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {Contact} from "../models/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  findContacts(firstName: string, lastName: string, sort?: Sort, page?: PageEvent): Observable<any> {
    let params = new HttpParams();

    if (firstName) {
      params = params.append("firstName", firstName);
    }

    if (lastName) {
      params = params.append("lastName", lastName);
    }

    if (sort) {
      params = params.append("sort", sort.active.concat(',').concat(sort.direction));
    }

    if (page) {
      params = params.append("page", page.pageIndex);
    }

    return this.http.get("/contacts", { params });
  }

  updateContact(contact: Contact): Observable<any> {
    return this.http.put(contact._links.contact.href, contact);
  }

  deleteContact(contact: Contact): Observable<any> {
    return this.http.delete(contact._links.contact.href);
  }
}
