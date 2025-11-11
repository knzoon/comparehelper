import {Region} from "./region";

export interface UserInfoFromApi {
  country: string;
  id: number;
  name: string;
  points: number;
  pointsPerHour: number;
  region: Region;
}
