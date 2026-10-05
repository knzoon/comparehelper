import {RouteTotal} from "./route-total";
import {Route} from "./route";

export interface TakeoversInDay {
  routeTotals: RouteTotal[];
  routes: Route[];
}
