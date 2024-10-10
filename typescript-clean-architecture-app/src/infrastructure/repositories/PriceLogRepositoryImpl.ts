import { PriceLog } from '../../domain/entities/PriceLog';
import { PriceLogRepository } from '../../domain/repositories/PriceLogRepository';

export class PriceLogRepositoryImpl implements PriceLogRepository {
  private priceLogs: PriceLog[] = [];

  async save(priceLog: PriceLog): Promise<void> {
    this.priceLogs.push(priceLog);
  }

  async getPriceLogsForProduct(productId: string): Promise<PriceLog[]> {
    return this.priceLogs.filter((log) => log.productId === productId);
  }
}