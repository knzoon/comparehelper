import {Component, OnInit} from '@angular/core';
import {CompareService} from "./compare.service";
import {TurfEffort} from "./turf-effort";
import {User} from "./user";
import {GraphData} from "./graph-data";
import {GraphDataset} from "./graph-dataset";
import {UserInfoFromApi} from "./user-info-from-api";
import {UserDecorated} from "./user-decorated";
import {DailyGraphData} from "./daily-graph-data";
import {DailyGraphDataset} from "./daily-graph-dataset";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  group: User[] = [];
  groupToModify: User[] = [];

  groupDecorated: UserDecorated[] = [];

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

  // All related to chart daily
  optionsDaily: any;
  dataDaily: DailyGraphData = {labels: [], datasets: []};
  allDailyDatasets: DailyGraphDataset[] = [];
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
      this.populateDecoratedUsers();
      this.populateEffort();
      this.populateCumulative();
      this.populateDaily();
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

    this.optionsDaily = {
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      },
      indexAxis: 'y',
      plugins: {
        colors: {
          forceOverride: true
        }
      }
    };

  }

  private populateDecoratedUsers(): void {
    this.groupDecorated = this.group.map((u) => {
      return {user: u, userInfo: undefined};
    });

    this.compareService.getUserInfoFromTurfApi(this.group).subscribe((userinfo: UserInfoFromApi[]) => {
      this.groupDecorated = userinfo.map((ui) => {
        let matchingUser: User = this.group.find((u) => u.id === ui.id) ?? {id:666, username: 'unknown'};
        return {userInfo : ui, user: matchingUser}
      }).sort((a, b) => b.userInfo.points - a.userInfo.points);

    });
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

  selectedCumulative(): GraphData {
//    console.info("running selectedCumulative()");
    let labelArr: string[] = ['1'];
    if (this.datasets.length > 0) {
      // console.info(this.generateLabelArr(5));
      labelArr = this.generateLabelArr(this.datasets[0].data.length);
    }
    return {
      labels: labelArr,
      datasets: this.datasets.filter(dataset => this.selectedUsers.some(user => dataset.label === user.username)).sort((a, b) => b.totalPoints - a.totalPoints)
    };
  }

  private populateDaily(): void {
    this.allDailyDatasets = [];
    for (let i = 0; i < this.group.length; i++) {
      this.compareService.getDailyPoints(this.group[i].username).subscribe((datasetsForUSer: DailyGraphDataset[]) => {
        this.allDailyDatasets.splice(2 * i, 0, datasetsForUSer[0]);
        this.allDailyDatasets.splice(2 * i + 1, 0, datasetsForUSer[1]);
        this.dataDaily = this.selectedDaily();
      });
    }
  }

  private selectedDaily(): DailyGraphData {
//    console.info("running selectedDaily()");
    let labelArr: string[] = ['1'];
    if (this.allDailyDatasets.length > 0) {
      labelArr = this.generateLabelArr(this.allDailyDatasets[0].data.length);
    }

    let filterdDatasets = this.allDailyDatasets.filter(dataset => this.selectedUsers.some(user => dataset.stack === user.username)).sort((a, b) => b.totalPoints - a.totalPoints);

    return {
      labels: labelArr,
      datasets: filterdDatasets
    };
  }


  private generateLabelArr(size: number): string[] {
    let label: string[] = [];

    for (let i = 1; i < size + 1; i++) {
      label.push(i.toString());
    }

    return label;
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

  selectedEffort(): TurfEffort[] {
//    console.info("running selectedEffort()");
    return this.turfEfforts.filter(effort => this.selectedUsers.some(user => effort.username === user.username)).sort((a, b) => b.points - a.points);
  }

  showManageGroupDialog() {
    this.displayManageGroupDialog = true;
  }

  handleManagedGroup(modifiedGroup: User[]) {
    this.group = modifiedGroup;
    this.groupToModify = this.group.slice();
    this.populateDecoratedUsers();
    this.populateEffort();
    this.populateCumulative();
    this.populateDaily();
  }

  handleUserselection() {
    this.selectedTurfEfforts = this.selectedEffort();
    this.dataCumulative = this.selectedCumulative();
    this.dataDaily = this.selectedDaily();
  }

  getFlagClass(code: string) : string {
    let correctCode = code;
    if (code === "uk") {
      correctCode = "gb";
    }
    return "fi fi-" + correctCode;
  }

  getFormattedPercentage(total: number, part: number): string {
    let apa: number = Math.round(part / total * 100);
    return `(${apa}%)`;
  }
}
