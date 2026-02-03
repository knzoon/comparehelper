import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrl: './help-dialog.component.css'
})
export class HelpDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  title: string = "Ett försök till hjälp att få ut det mesta av Comparehelper";
  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }
}
