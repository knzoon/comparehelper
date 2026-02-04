import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ManageGroupDialogComponent } from './manage-group-dialog/manage-group-dialog.component';
import {DialogModule} from "primeng/dialog";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ListboxModule} from "primeng/listbox";
import {CheckboxModule} from "primeng/checkbox";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import {TakeoverSummaryDialogComponent} from "./takeover-summary-dialog/takeover-summary-dialog.component";
import { TakeoverDialogComponent } from './takeover-dialog/takeover-dialog.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import {TooltipModule} from "primeng/tooltip";
import { DonateDialogComponent } from './donate-dialog/donate-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageGroupDialogComponent,
    TakeoverSummaryDialogComponent,
    TakeoverDialogComponent,
    HelpDialogComponent,
    DonateDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    AutoCompleteModule,
    ListboxModule,
    CheckboxModule,
    CardModule,
    TableModule,
    ChartModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
