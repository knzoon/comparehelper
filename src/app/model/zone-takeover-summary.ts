import {ZoneTakeover} from "./zone-takeover";

export interface ZoneTakeoverSummary {
  zoneName: string;
  areaName: string;
  tp: number;
  pph: number;
  takeovers: ZoneTakeover[];
}
