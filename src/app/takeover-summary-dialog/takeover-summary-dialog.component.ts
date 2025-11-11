import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TakeoverSummaryDay} from "../model/takeover-summary-day";

@Component({
  selector: 'app-takeover-summary-dialog',
  templateUrl: './takeover-summary-dialog.component.html',
  styleUrl: './takeover-summary-dialog.component.css'
})
export class TakeoverSummaryDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  @Input() takeoverSummary: TakeoverSummaryDay[] = [];

  @Input() userId: string = "praktikus";

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

}
