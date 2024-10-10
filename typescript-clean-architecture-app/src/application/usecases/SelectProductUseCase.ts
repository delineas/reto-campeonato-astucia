import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class SelectProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string, name: string, threshold: number) {
    const product = new Product(productId, name, 0, threshold);
    await this.productRepository.save(product);
  }
}