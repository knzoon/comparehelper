import {CumulativeGraphDataset} from "./cumulative-graph-dataset";
import {DailyGraphDataset} from "./daily-graph-dataset";
import {TakeoverSummaryDay} from "./takeover-summary-day";

export interface GraphDatasetCollection {
  cumulative: CumulativeGraphDataset;
  daily: DailyGraphDataset[];
  takeoverSummaryDaily: TakeoverSummaryDay[];
}
