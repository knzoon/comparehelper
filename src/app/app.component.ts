import {Component, OnInit} from '@angular/core';
import {CompareService} from "./compare.service";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";
import {group} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  turfEffort?: TurfEffort;

  group: User[] = [];
  groupToModify: User[] = [];

  displayManageGroupDialog: boolean = false;

  readonly lsGroupKey: string = "group";

  constructor(private compareService: CompareService) {
  }

  ngOnInit(): void {
    const jsonStringFromStorage: string | null = localStorage.getItem(this.lsGroupKey);
    if (jsonStringFromStorage) {
      let users: User[] = JSON.parse(jsonStringFromStorage);
      this.group = users;
      this.groupToModify = users.slice();
    }

  }

  callBackend() {
    this.compareService.getTurfEffort().subscribe( (turfEffort: TurfEffort) => {
      this.turfEffort = turfEffort;
    });
  }

  showManageGroupDialog() {
    this.displayManageGroupDialog = true;
  }

  handleManagedGroup(modifiedGroup: User[]) {
    this.group = modifiedGroup;
    this.groupToModify = this.group.slice();
  }
}
