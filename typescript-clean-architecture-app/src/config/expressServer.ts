import express, { Request, Response } from 'express';
import { ProductController } from '../interfaces/controllers/ProductController';
import { PriceMonitorController } from '../interfaces/controllers/PriceMonitorController';
import { PriceHistoryController } from '../interfaces/controllers/PriceHistoryController';
import { SelectProductUseCase } from '../application/usecases/SelectProductUseCase';
import { MonitorPriceUseCase } from '../application/usecases/MonitorPriceUseCase';
import { ProductRepositoryImpl } from '../infrastructure/repositories/ProductRepositoryImpl';
import { PriceLogRepositoryImpl } from '../infrastructure/repositories/PriceLogRepositoryImpl';
import { AmazonScraperService } from '../infrastructure/services/AmazonScraperService';

const app = express();
app.use(express.json());

const productRepository = new ProductRepositoryImpl();
const priceLogRepository = new PriceLogRepositoryImpl();
const priceMonitorService = new AmazonScraperService();

const selectProductUseCase = new SelectProductUseCase(productRepository);
const monitorPriceUseCase = new MonitorPriceUseCase(priceMonitorService, priceLogRepository, productRepository);

const productController = new ProductController(selectProductUseCase);
const priceMonitorController = new PriceMonitorController(monitorPriceUseCase);
const priceHistoryController = new PriceHistoryController(priceLogRepository);

app.post('/product', (req: Request, res: Response) => productController.selectProduct(req, res));
app.get('/product/:productId/monitor', (req: Request, res: Response) => priceMonitorController.monitorPrice(req, res));
app.get('/product/:productId/history', (req: Request, res: Response) => priceHistoryController.getPriceHistory(req, res));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});