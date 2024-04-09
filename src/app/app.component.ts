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

  group: User[] = [];
  groupToModify: User[] = [];

  selectedUsers: User[] = [];

  displayManageGroupDialog: boolean = false;

  readonly lsGroupKey: string = "group";

  // All related to turf effort vvv
  turfEfforts: TurfEffort[] = [];
  // end ^^^^^^^^^^^^^^^^^^^^^^^^^^

  constructor(private compareService: CompareService) {
  }

  ngOnInit(): void {
    const jsonStringFromStorage: string | null = localStorage.getItem(this.lsGroupKey);
    if (jsonStringFromStorage) {
      let users: User[] = JSON.parse(jsonStringFromStorage);
      this.group = users;
      this.groupToModify = users.slice();
      this.selectedUsers = users.slice();
      this.populateEffort();
    }

  }

  private populateEffort(): void {
    this.turfEfforts = [];
    for (let i = 0; i < this.group.length; i++) {
      this.compareService.getTurfEffort(this.group[i].username).subscribe((turfEffort: TurfEffort) => {
        this.turfEfforts.splice(i, 0, turfEffort);
      });
    }
  }

  selectedEffort(): TurfEffort[] {
    return this.turfEfforts.filter(effort => this.selectedUsers.some(user => effort.username === user.username));
  }

  showManageGroupDialog() {
    this.displayManageGroupDialog = true;
  }

  handleManagedGroup(modifiedGroup: User[]) {
    this.group = modifiedGroup;
    this.groupToModify = this.group.slice();
    this.populateEffort();
  }
}
