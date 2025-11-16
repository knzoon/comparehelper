import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Takeover} from "../model/takeover";

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

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

}
