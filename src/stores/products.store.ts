import { ProductsService } from 'src/services/products.service';
import { storageService } from 'src/local-storages/receipt.storage';

export const productsService = new ProductsService(storageService);
export const productsStore = productsService.products$;
export const productsTotal = productsService.totalPrice$;