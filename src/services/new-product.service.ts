import { debounceTime } from 'rxjs';
import type { BrowserStorageService } from 'src/services/storage.service';
import { BehaviorSubjectWritable } from 'src/utils/rx';
import type { ReceiptStorage } from 'src/utils/types';

export class NewProductService {
  readonly newProduct$;

  constructor(private storageService: BrowserStorageService<ReceiptStorage>) {
    this.newProduct$ = new BehaviorSubjectWritable(this.storageService.storage.newProduct || { name: '', price: 0 });
    this.newProduct$.pipe(
      debounceTime(500)
    ).subscribe((newProduct) => {
      storageService.storage.newProduct = newProduct;
      // storageService.set('newProduct', newProduct);
    });
  }
}
