import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {ZoneTakeoverSummary} from "../model/zone-takeover-summary";

@Component({
  selector: 'app-zone-summary-dialog',
  templateUrl: './zone-summary-dialog.component.html',
  styleUrl: './zone-summary-dialog.component.css'
})
export class ZoneSummaryDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  @Input() zonename: string = "Trollhyveln";
  @Input() zoneTakeoverSummary: ZoneTakeoverSummary = {zoneName: "undefined", areaName: "undefined", tp: 0, pph: 0, takeovers: []};

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

}
