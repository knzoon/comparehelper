import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Takeover} from "../model/takeover";
import {ZoneTakeoverSummary} from "../model/zone-takeover-summary";
import {CompareService} from "../compare.service";
import {ToplistUniqueUserForArea} from "../model/toplist-unique-user-for-area";

@Component({
  selector: 'app-takeover-dialog',
  templateUrl: './takeover-dialog.component.html',
  styleUrl: './takeover-dialog.component.css'
})
export class TakeoverDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  @Input() takeoversInDay: Takeover[][] = [];

  @Input() userId: string = "praktikus";

  displayZoneSummaryDialog: boolean = false;
  currentZonename: string = "";
  currentZoneTakeoverSummary: ZoneTakeoverSummary = {zoneName: "undefined", areaName: "undefined", tp: 0, pph: 0, takeovers: []};

  displayToplistAreaDialog: boolean = false;
  currentAreaname: string = "";
  currentToplist: ToplistUniqueUserForArea = {areaName: "undefined", nrofZones: 0, toplist: []};

  constructor(private compareService: CompareService) {
  }

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

  showZoneSummaryDialog(zonename: string, zoneId: number) : void {
    this.currentZonename = zonename;
    this.currentZoneTakeoverSummary = {zoneName: "", areaName: "Hämtar data...", tp: 0, pph: 0, takeovers: []};
    this.compareService.getZoneTakeoverSummary(zoneId).subscribe((summary: ZoneTakeoverSummary) => {
        this.currentZoneTakeoverSummary = summary;
    });

    this.displayZoneSummaryDialog = true;
  }

  showToplistDialog(areaName: string, areaId: number) : void {
    this.currentAreaname = areaName;
    this.currentToplist = {areaName: "Hämtar data...", nrofZones: 0, toplist: []};
    this.compareService.getToplistUniqueForArea(areaId).subscribe((toplist: ToplistUniqueUserForArea) => {
      this.currentToplist = toplist;
    });

    this.displayToplistAreaDialog = true;
  }

}
