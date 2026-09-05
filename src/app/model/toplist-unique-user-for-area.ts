import {NrofUniqueForUser} from "./nrof-unique-for-user";

export interface ToplistUniqueUserForArea {
  areaName: string;
  nrofZones: number;
  toplist: NrofUniqueForUser[];
}
