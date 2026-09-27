import {ZoneTakeover} from "./zone-takeover";
import {ZoneTakeoverTotal} from "./zone-takeover-total";

export interface ZoneTakeoverSummary {
  zoneName: string;
  areaName: string;
  tp: number;
  pph: number;
  takeovers: ZoneTakeover[];
  totals: ZoneTakeoverTotal[];
}
