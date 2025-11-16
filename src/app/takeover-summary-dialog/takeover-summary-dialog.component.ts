import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TakeoverSummaryDay} from "../model/takeover-summary-day";
import {Takeover} from "../model/takeover";

@Component({
  selector: 'app-takeover-summary-dialog',
  templateUrl: './takeover-summary-dialog.component.html',
  styleUrl: './takeover-summary-dialog.component.css'
})
export class TakeoverSummaryDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  @Input() takeoverSummary: TakeoverSummaryDay[] = [];

  @Input() takeoversInRound: Takeover[][][] = [];

  @Input() userId: string = "praktikus";

  displayTakeoverDialog: boolean = false;
  currentDayIndex: number = 0;
  currentTitle : string = "";
  currentTakeoversInDay: Takeover[][] = [];

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

  showTakeoverDialog(index : number) : void {
    console.log(index);
    this.currentDayIndex = index;
    this.currentTitle = this.userId + " - Dag " + (this.currentDayIndex + 1);
    this.currentTakeoversInDay = this.getTakeoversInDay(index);
    this.displayTakeoverDialog = true;
  }

  private getTakeoversInDay(index: number) : Takeover[][] {
    console.info("number of days in round = " + this.takeoversInRound.length)
    if (index < this.takeoversInRound.length) {
      return this.takeoversInRound[index].slice();
    }

    return [];
  }
}
