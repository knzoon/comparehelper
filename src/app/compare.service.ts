import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";
import {CumulativeGraphDataset} from "./cumulative-graph-dataset";
import {UserInfoFromApi} from "./user-info-from-api";
import {SearchId} from "./search-id";
import {DailyGraphDataset} from "./daily-graph-dataset";
import {GraphDatasetCollection} from "./graph-dataset-collection";

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

  getCombinedGraphdata(username: string) : Observable<GraphDatasetCollection> {
    const url = `${this.baseURL}graphs` + "?username=" + username;
    return this.http.get<GraphDatasetCollection>(url);
  }

  getUserInfoFromTurfApi(users: User[]): Observable<UserInfoFromApi[]> {
    //const url: string = "/unstable/users";
    const url: string = "/api/userinfo";
    let searchParams: SearchId[];
    searchParams = users.map((user) => {
      return {id: user.id}
    });
    return this.http.post<UserInfoFromApi[]>(url, searchParams);
  }

}
