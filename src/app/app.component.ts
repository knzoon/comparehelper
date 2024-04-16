import {Component, OnInit} from '@angular/core';
import {CompareService} from "./compare.service";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";
import {GraphData} from "./graph-data";
import {GraphDataset} from "./graph-dataset";

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
  selectedTurfEfforts: TurfEffort[] = [];
  // end ^^^^^^^^^^^^^^^^^^^^^^^^^^

  // All related to chart cumulative
  optionsCumulative: any;
  dataCumulative: GraphData = {labels: [], datasets: []};
  datasets: GraphDataset[] = [];
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
      this.populateCumulative();
    }

    this.optionsCumulative = {
      parsing: {
        xAxisKey: 'day',
        yAxisKey: 'points'
      },
      plugins: {
        colors: {
          forceOverride: true
        }
      }
    };
  }

  private populateCumulative(): void {
    this.datasets = [];
    for (let i = 0; i < this.group.length; i++) {
      this.compareService.getCumulativePoints(this.group[i].username).subscribe((dataset: GraphDataset) => {
        this.datasets.splice(i, 0, dataset);
        this.dataCumulative = this.selectedCumulative();
      });
    }
  }

  private populateEffort(): void {
    this.turfEfforts = [];
    for (let i = 0; i < this.group.length; i++) {
      this.compareService.getTurfEffort(this.group[i].username).subscribe((turfEffort: TurfEffort) => {
        this.turfEfforts.splice(i, 0, turfEffort);
        this.selectedTurfEfforts = this.selectedEffort();
      });
    }
  }

  selectedCumulative(): GraphData {
    console.info("running selectedCumulative()");
    return {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
      datasets: this.datasets.filter(dataset => this.selectedUsers.some(user => dataset.label === user.username))
    };
  }


  selectedEffort(): TurfEffort[] {
    console.info("running selectedEffort()");
    return this.turfEfforts.filter(effort => this.selectedUsers.some(user => effort.username === user.username)).sort((a, b) => b.points - a.points);
  }

  showManageGroupDialog() {
    this.displayManageGroupDialog = true;
  }

  handleManagedGroup(modifiedGroup: User[]) {
    this.group = modifiedGroup;
    this.groupToModify = this.group.slice();
    this.populateEffort();
  }

  handleUserselection() {
    this.selectedTurfEfforts = this.selectedEffort();
    this.dataCumulative = this.selectedCumulative();
  }
}
