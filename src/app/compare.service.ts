import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, of} from "rxjs";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";
import {GraphDataset} from "./graph-dataset";
import {UserInfoFromApi} from "./user-info-from-api";
import {SearchId} from "./search-id";
import {DailyGraphDataset} from "./daily-graph-dataset";

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

  getDailyPoints(username: string) : Observable<DailyGraphDataset[]> {
    const url = `${this.baseURL}daily` + "?username=" + username;
    return this.http.get<DailyGraphDataset[]>(url);

    // if (username === "praktikus") {
    //   return of(
    //     [
    //             {
    //               label: "Takepoint praktikus",
    //               data: [50, 75, 25],
    //               stack: "praktikus",
    //               totalPoints: 300
    //             },
    //             {
    //               label: "Pph praktikus",
    //               data: [25, 50, 75],
    //               stack: "praktikus",
    //               totalPoints: 300
    //             }
    //           ]
    //   );
    // }
    //
    // if (username === "WhiteNinja") {
    //   return of(
    //     [
    //       {
    //         label: "Takepoint WhiteNinja",
    //         data: [40, 30, 20],
    //         stack: "WhiteNinja",
    //         totalPoints: 150
    //       },
    //       {
    //         label: "Pph WhiteNinja",
    //         data: [30, 20, 10],
    //         stack: "WhiteNinja",
    //         totalPoints: 150
    //       }
    //     ]
    //   );
    // }
    //
    // return of([]);
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
