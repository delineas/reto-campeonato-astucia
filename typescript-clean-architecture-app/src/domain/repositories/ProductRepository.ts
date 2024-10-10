import { Product } from '../entities/Product';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(productId: string): Promise<Product>;
}