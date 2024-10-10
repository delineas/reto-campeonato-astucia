export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public threshold: number
  ) {}

  checkPriceThreshold(newPrice: number): boolean {
    return newPrice <= this.threshold;
  }
}