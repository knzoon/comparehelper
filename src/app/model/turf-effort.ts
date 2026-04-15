import {PphDistribution} from "./pph-distribution";

export interface TurfEffort {
  username: string;
  timeSpent: string;
  points: number;
  takes: number;
  routes: number;
  takesInRoutes: number;
  pointsByPph: number;
  pphDistribution: PphDistribution;
  pphDistributionAllTakeovers: PphDistribution;
}
