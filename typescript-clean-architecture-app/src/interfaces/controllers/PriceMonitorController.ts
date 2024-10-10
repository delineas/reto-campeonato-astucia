import { Request, Response } from 'express';
import { MonitorPriceUseCase } from '../../application/usecases/MonitorPriceUseCase';

export class PriceMonitorController {
  constructor(private monitorPriceUseCase: MonitorPriceUseCase) {}

  async monitorPrice(req: Request, res: Response) {
    const productId = req.params.productId;
    await this.monitorPriceUseCase.execute(productId);
    res.sendStatus(200);
  }
}