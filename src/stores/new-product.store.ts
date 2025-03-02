import { NewProductService } from 'src/services/new-product.service';
import { storageService } from 'src/local-storages/receipt.storage';

export const newProductService = new NewProductService(storageService);
export const newProduct = newProductService.newProduct$;