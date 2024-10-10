import { PriceLogRepository } from '../../domain/repositories/PriceLogRepository';
import { PriceLog } from '../../domain/entities/PriceLog';

export class PersistPriceChangeUseCase {
  constructor(private priceLogRepository: PriceLogRepository) {}

  async execute(productId: string, price: number) {
    const priceLog = PriceLog.create(productId, price);
    await this.priceLogRepository.save(priceLog);
  }
}