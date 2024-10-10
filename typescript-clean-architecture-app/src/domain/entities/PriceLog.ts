export class PriceLog {
  constructor(
    public id: string,
    public productId: string,
    public price: number,
    public timestamp: Date
  ) {}

  static create(productId: string, price: number): PriceLog {
    return new PriceLog(generateId(), productId, price, new Date());
  }
}