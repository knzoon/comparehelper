import { Component } from '@angular/core';
import {CompareService} from "./compare.service";
import {TurfEffort} from "./turf-effort";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  turfEffort?: TurfEffort;


  constructor(private compareService: CompareService) {
  }

  callBackend() {
    this.compareService.getTurfEffort().subscribe( (turfEffort: TurfEffort) => {
      this.turfEffort = turfEffort;
    });
  }
}
