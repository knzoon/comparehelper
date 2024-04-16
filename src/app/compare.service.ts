import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";
import {GraphDataset} from "./graph-dataset";

@Injectable({
  providedIn: 'root'
})
export class CompareService {

  private baseURL = '/api/';

  constructor(private http: HttpClient) { }

  getTurfEffort(username: string) : Observable<TurfEffort>  {
    const url = `${this.baseURL}turfeffort` + "?username=" + username;
    return this.http.get<TurfEffort>(url);
  }

  getUsers(searchStr: string): Observable<User[]> {
    const url = `${this.baseURL}allusers` + "?searchString=" +  searchStr;
    return this.http.get<User[]>(url);
  }

  getCumulativePoints(username: string) : Observable<GraphDataset> {
    const url = `${this.baseURL}cumulative` + "?username=" + username;
    return this.http.get<GraphDataset>(url);
    // if (username === "praktikus") {
    //   return of({
    //     label: 'praktikus',
    //     data: [{points: 566, day:'1'}, {points: 1258, day:'2'}, {points: 2412, day:'3'}]
    //   }).pipe(delay(2000));
    // }
    //
    // if (username === "LeiLar") {
    //   return of({
    //     label: 'LeiLar',
    //     data: [{points: 65, day:'1'}, {points: 130, day:'2'}, {points: 260, day:'3'}]
    //   }).pipe(delay(1000));
    // }
    //
    // if (username === "cotten") {
    //   return of({
    //     label: 'cotten',
    //     data: [{points: 100, day:'1'}, {points: 170, day:'2'}, {points: 212, day:'3'}]
    //   }).pipe(delay(500));
    // }
    //
    // return of({
    //   label: 'unknown',
    //   data: []
    // });
  }
}
