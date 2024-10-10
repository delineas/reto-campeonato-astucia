import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class ProductRepositoryImpl implements ProductRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(productId: string): Promise<Product> {
    return this.products.find((product) => product.id === productId);
  }
}