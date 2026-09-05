import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToplistUniqueUserForArea} from "../model/toplist-unique-user-for-area";

@Component({
  selector: 'app-toplist-zone-area-dialog',
  templateUrl: './toplist-zone-area-dialog.component.html',
  styleUrl: './toplist-zone-area-dialog.component.css'
})
export class ToplistZoneAreaDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  @Input() areaName: string = "Umeå kommun";
  @Input() toplist: ToplistUniqueUserForArea = {areaName: "undefined", nrofZones: 0, toplist: []};

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

  calculatePercentage(nrofUnique: number) : string {
    let percentage : number = Math.round(nrofUnique / this.toplist.nrofZones * 100);
    return `${percentage}%`;
  }

}
