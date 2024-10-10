import { Request, Response } from 'express';
import { SelectProductUseCase } from '../../application/usecases/SelectProductUseCase';

export class ProductController {
  constructor(private selectProductUseCase: SelectProductUseCase) {}

  async selectProduct(req: Request, res: Response) {
    const { productId, name, threshold } = req.body;
    await this.selectProductUseCase.execute(productId, name, threshold);
    res.sendStatus(200);
  }
}