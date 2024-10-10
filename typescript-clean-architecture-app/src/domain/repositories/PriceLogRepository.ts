import { PriceLog } from '../entities/PriceLog';

export interface PriceLogRepository {
  save(priceLog: PriceLog): Promise<void>;
  getPriceLogsForProduct(productId: string): Promise<PriceLog[]>;
}