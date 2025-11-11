import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {TurfEffort} from "./model/turf-effort";
import {User} from "./model/user";
import {CumulativeGraphDataset} from "./model/cumulative-graph-dataset";
import {UserInfoFromApi} from "./model/user-info-from-api";
import {SearchId} from "./model/search-id";
import {DailyGraphDataset} from "./model/daily-graph-dataset";
import {GraphDatasetCollection} from "./model/graph-dataset-collection";

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
