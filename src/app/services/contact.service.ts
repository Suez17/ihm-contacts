import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {
  }

  findAllContacts(firstName: string, lastName: string): Observable<any> {
    let params = new HttpParams();

    if (firstName) {
      params = params.append("firstName", firstName);
    }

    if (lastName) {
      params = params.append("lastName", lastName);
    }

    return this.http.get("/contacts", { params });
  }
}
