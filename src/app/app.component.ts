import {Component, OnInit} from '@angular/core';
import {CompareService} from "./compare.service";
import {TurfEffort} from "./model/turf-effort";
import {User} from "./model/user";
import {CumulativeGraphData} from "./model/cumulative-graph-data";
import {CumulativeGraphDataset} from "./model/cumulative-graph-dataset";
import {UserInfoFromApi} from "./model/user-info-from-api";
import {UserDecorated} from "./model/user-decorated";
import {DailyGraphData} from "./model/daily-graph-data";
import {DailyGraphDataset} from "./model/daily-graph-dataset";
import {GraphDatasetCollection} from "./model/graph-dataset-collection";
import {TakeoverSummaryDay} from "./model/takeover-summary-day";
import {Takeover} from "./model/takeover";

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
  displayTakeoverSummaryDialog: boolean = false;
  displayHelpModal: boolean = false;

  readonly lsGroupKey: string = "group";
  readonly lsSelectedUserKey: string = "selectedUsers";

  // All related to turf effort vvv
  turfEfforts: TurfEffort[] = [];
  selectedTurfEfforts: TurfEffort[] = [];
  // end ^^^^^^^^^^^^^^^^^^^^^^^^^^

  // All related to chart cumulative
  optionsCumulative: any;
  dataCumulative: CumulativeGraphData = {labels: [], datasets: []};
  allCumulativeDatasets: CumulativeGraphDataset[] = [];
  // end ^^^^^^^^^^^^^^^^^^^^^^^^^^

  // All related to chart daily
  optionsDaily: any;
  dataDaily: DailyGraphData = {labels: [], datasets: []};
  allDailyDatasets: DailyGraphDataset[] = [];
  // end ^^^^^^^^^^^^^^^^^^^^^^^^^^

  takeoverSummaries : Map<string, TakeoverSummaryDay[]> = new Map();
  currentTakeoverSummary: TakeoverSummaryDay[] = [];
  currentUserId: string = "";
  takeoversInRound: Takeover[][][] = [];

  constructor(private compareService: CompareService) {
  }

  ngOnInit(): void {
    const groupJsonStringFromStorage: string | null = localStorage.getItem(this.lsGroupKey);
    if (groupJsonStringFromStorage) {
      let users: User[] = JSON.parse(groupJsonStringFromStorage);
      this.group = users;
      this.groupToModify = users.slice();
//      this.selectedUsers = users.slice();
      this.populateDecoratedUsers();
      this.populateEffort();
      this.populateGraphData();
    }

    const selectedUsersJsonStringFromStorage: string | null = localStorage.getItem(this.lsSelectedUserKey);
    if (selectedUsersJsonStringFromStorage) {
      let users: User[] = JSON.parse(selectedUsersJsonStringFromStorage);
      this.selectedUsers = users.slice();
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
          enabled: false,
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

  private populateGraphData(): void {
    this.allCumulativeDatasets = [];
    this.allDailyDatasets = [];
    for (let i = 0; i < this.group.length; i++) {
      this.compareService.getCombinedGraphdata(this.group[i].username).subscribe((datasetCollection: GraphDatasetCollection) => {
        this.allCumulativeDatasets.splice(i, 0, datasetCollection.cumulative);
        this.dataCumulative = this.selectedCumulative();
        this.allDailyDatasets.splice(2 * i, 0, datasetCollection.daily[0]);
        this.allDailyDatasets.splice(2 * i + 1, 0, datasetCollection.daily[1]);
        this.dataDaily = this.selectedDaily();
        this.updateTakeoversummary(this.group[i].username, datasetCollection.takeoverSummaryDaily);
      });
    }

  }

  selectedCumulative(): CumulativeGraphData {
//    console.info("running selectedCumulative()");
    let labelArr: string[] = ['1'];
    if (this.allCumulativeDatasets.length > 0) {
      // console.info(this.generateLabelArr(5));
      labelArr = this.generateLabelArr(this.allCumulativeDatasets[0].data.length);
    }
    return {
      labels: labelArr,
      datasets: this.allCumulativeDatasets.filter(dataset => this.selectedUsers.some(user => dataset.label === user.username)).sort((a, b) => b.totalPoints - a.totalPoints)
    };
  }

  private selectedDaily(): DailyGraphData {
//    console.info("running selectedDaily()");
    let labelArr: string[] = ['1'];
    if (this.allDailyDatasets.length > 0) {
      labelArr = this.generateLabelArr(this.allDailyDatasets[0].data.length);
    }

    let filterdDatasets = this.allDailyDatasets.filter(dataset => this.selectedUsers.some(user => dataset.stack === user.username)).sort((a, b) => b.totalPoints - a.totalPoints);

    let coloredDatasets = this.addBarColor(filterdDatasets);

    return {
      labels: labelArr,
      datasets: coloredDatasets
    };
  }

  private addBarColor(datasets: DailyGraphDataset[]): DailyGraphDataset[] {
    const colors = [
      "#228ed7", "#4ab6ff",
      "#eb4f70", "#ff7798",
      "#eb8b2c", "#ffb354",
      "#ebb942", "#ffe16a",
      "#37acac", "#5fd4d4",
      "#8552eb", "#ad7aff",
      "#b5b7bb", "#dddfe3"];

    for (let i = 0; i < datasets.length; i++) {
      // console.info(i + " mod 7 = " + i%7);
      datasets[i].backgroundColor = colors[i%14];
    }

    return datasets;
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
    this.handleNewAndRemovedUsersInGroup(modifiedGroup);
    this.group = modifiedGroup;
    this.groupToModify = this.group.slice();
    this.populateDecoratedUsers();
    this.populateEffort();
    this.populateGraphData();
  }

  handleNewAndRemovedUsersInGroup(modifiedGroup: User[]) : void {
    let newUsers: User[] = modifiedGroup.filter(newUser => !this.group.some(user => newUser.username === user.username));
    // console.info("New users");
    // newUsers.forEach(user => console.info(user.username));
    let removedUsers: User[] = this.group.filter(removedUser => !modifiedGroup.some(user => removedUser.username === user.username));
    // console.info("Removed users");
    // removedUsers.forEach(user => console.info(user.username));
    let shouldBeSelected: User[] = this.selectedUsers.filter(notRemoved => !removedUsers.some(user => notRemoved.username === user.username)).concat(newUsers);
    // console.info("New selected users");
    // shouldBeSelected.forEach(user => console.info(user.username));

    const jsonData: string = JSON.stringify(shouldBeSelected);
    localStorage.setItem(this.lsSelectedUserKey, jsonData);

    this.selectedUsers = shouldBeSelected;
  }

  handleUserselection() {
    const jsonData: string = JSON.stringify(this.selectedUsers);
    localStorage.setItem(this.lsSelectedUserKey, jsonData);

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

  showTakeoverSummaryDialog(username: string): void {
    let summary = this.takeoverSummaries.get(username);

    if (summary) {
      this.currentTakeoverSummary = summary.slice();
    } else {
      this.currentTakeoverSummary = [];
    }

    this.currentUserId = username;
    this.compareService.getTakeoversForUser(username).subscribe((takeovers: Takeover[][][]) => {
      this.takeoversInRound = takeovers.slice();
    });
    this.displayTakeoverSummaryDialog = true;
  }

  private updateTakeoversummary(username: string, takeoverSummaryDaily: TakeoverSummaryDay[]) {
    if (this.takeoverSummaries.has(username)) {
      this.takeoverSummaries.delete(username);
    }

    this.takeoverSummaries.set(username, takeoverSummaryDaily);
  }

  showHelpModalDialog() {
    this.displayHelpModal = true;
  }

}
