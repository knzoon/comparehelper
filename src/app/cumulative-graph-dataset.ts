import {CumulativeGraphDatapoint} from "./cumulative-graph-datapoint";

export interface CumulativeGraphDataset {
  label: string;
  data: CumulativeGraphDatapoint[];
  totalPoints: number;
}
