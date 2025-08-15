import {CumulativeGraphDataset} from "./cumulative-graph-dataset";
import {DailyGraphDataset} from "./daily-graph-dataset";

export interface GraphDatasetCollection {
  cumulative: CumulativeGraphDataset;
  daily: DailyGraphDataset[]
}
