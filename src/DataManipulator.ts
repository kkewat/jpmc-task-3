import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row {
    const PriceABC = (ServerRespond[0].top_ask.price + ServerRespond[0].top_bid.price)/2
	const PriceDEF = (ServerRespond[0].top_ask.price + ServerRespond[0].top_bid.price)/2
	const upperBound = 1 + 0.1;
	const lowerBound = 1 - 0.1;
	return{
		price_abc: PriceABC,
		price_def: PriceDEF,
		ratio,
		timestamp: ServerRespond[0].timestamp > ServerRespond[1].timestamp ? ServerRespond[0].timestamp : ServerRespond[1]
		upper_bound: upperBound,
		lower_bound: lowerBound,
		trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
	};
  }
}
