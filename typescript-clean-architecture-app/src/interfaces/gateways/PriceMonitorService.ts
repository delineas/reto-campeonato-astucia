interface PriceMonitorService {
  getPrice(productId: string): Promise<number>;
}

export default PriceMonitorService;