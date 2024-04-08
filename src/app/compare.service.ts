import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  private baseURL = '/api/';

  constructor(private http: HttpClient) { }

  getTurfEffort() : Observable<TurfEffort>  {
    const url = `${this.baseURL}turfeffort?username=praktikus`;
    return this.http.get<TurfEffort>(url);
  }

  getUsers(searchStr: string): Observable<User[]> {
    const url = `${this.baseURL}users` + "?searchString=" +  searchStr;
    return this.http.get<User[]>(url);
  }
}
