import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sort} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  findContacts(firstName: string, lastName: string, sort?: Sort): Observable<any> {
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

    return this.http.get("/contacts", { params });
  }
}
