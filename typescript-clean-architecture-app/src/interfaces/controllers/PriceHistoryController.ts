import { Request, Response } from 'express';
import { PriceLogRepository } from '../../domain/repositories/PriceLogRepository';

class PriceHistoryController {
  constructor(private priceLogRepository: PriceLogRepository) {}

  async getPriceHistory(req: Request, res: Response) {
    const productId = req.params.productId;
    const priceLogs = await this.priceLogRepository.getPriceLogsForProduct(productId);
    res.json(priceLogs);
  }
}

export { PriceHistoryController };