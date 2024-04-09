import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../user";
import {CompareService} from "../compare.service";

@Component({
  selector: 'app-manage-group-dialog',
  templateUrl: './manage-group-dialog.component.html',
  styleUrl: './manage-group-dialog.component.css'
})
export class ManageGroupDialogComponent {
  @Input() displayDialog: boolean = false;
  @Output()  displayDialogChange= new EventEmitter<boolean>();

  @Input() usersToSave: User[] = [];
  @Output() usersToSaveChange= new EventEmitter<User[]>();


  selectedAddUser?: User;
  suggestedUsers: User[] = [];

  selectedSaveUser?: User;

  readonly lsGroupKey: string = "group";

  constructor(private compareService: CompareService) {}

  closeDialog() : void {
    this.displayDialogChange.emit(false);
  }

  searchUsers(event: any) {
    this.compareService.getUsers(event.query).subscribe((users : User[]) => {
      this.suggestedUsers = users;
    });
  }

  userSelected(event: any) {
    if (this.selectedAddUser) {
      this.usersToSave.push(this.selectedAddUser);
      this.usersToSave = this.usersToSave.slice();
      this.selectedAddUser = undefined;
    }
  }

  deleteUser(user: any) {
    let id = this.usersToSave.indexOf(user);
    this.usersToSave.splice(id, 1);
    this.usersToSave = this.usersToSave.slice();
    this.selectedAddUser = undefined;
  }

  dontAllowSaveLeague() : boolean {
    return this.usersToSave.length == 0;
  }

  saveGroup(): void {
    const jsonData: string = JSON.stringify(this.usersToSave);
    localStorage.setItem(this.lsGroupKey, jsonData);
    this.usersToSaveChange.emit(this.usersToSave);

    this.displayDialog = false;
  }

}
