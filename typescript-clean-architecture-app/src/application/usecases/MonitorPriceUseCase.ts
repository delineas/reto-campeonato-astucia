import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { PriceMonitorService } from '../../interfaces/gateways/PriceMonitorService';
import { PriceLogRepository } from '../../domain/repositories/PriceLogRepository';
import { Product } from '../../domain/entities/Product';
import { PriceLog } from '../../domain/entities/PriceLog';

export class MonitorPriceUseCase {
  constructor(
    private priceMonitorService: PriceMonitorService,
    private priceLogRepository: PriceLogRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(productId: string) {
    const product = await this.productRepository.findById(productId);
    const price = await this.priceMonitorService.getPrice(productId);
    const priceLog = PriceLog.create(productId, price);

    await this.priceLogRepository.save(priceLog);

    if (product.checkPriceThreshold(price)) {
      // Logic to send notification
    }
  }
}