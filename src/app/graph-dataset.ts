import {GraphDatapoint} from "./graph-datapoint";

export interface GraphDataset {
  label: string;
  data: GraphDatapoint[];
}
