import { map, tap } from 'rxjs';
import { BrowserStorageService } from 'src/services/storage.service';
import type { ReceiptStorage, Product } from 'src/utils/types';
import { BehaviorSubjectWritable } from 'src/utils/rx';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Apples',
    price: 1.99,
    quantity: 0.5
  },
  {
    id: 2,
    name: 'Bread',
    price: 0.99,
    quantity: 1
  },
  {
    id: 3,
    name: 'Canned beans',
    price: 1.2,
    quantity: 4
  },
  {
    id: 4,
    name: 'Soap',
    price: 0.79,
    quantity: 2
  }
];

export class ProductsService {
  private readonly idCount$;
  readonly products$;
  readonly totalPrice$;

  constructor(private storageService: BrowserStorageService<ReceiptStorage>) {
    this.idCount$ = new BehaviorSubjectWritable(this.storageService.storage.idCount || initialProducts.length + 1);
    this.products$ = new BehaviorSubjectWritable(this.storageService.storage.products || initialProducts);

    this.totalPrice$ = this.products$.pipe(
      tap((products) => {
        storageService.storage.products = products;
        // storageService.set('products', products);
      }),
      map((products) => products.reduce((acc, p) => acc + Number((p.price * p.quantity).toFixed(2)), 0))
    );

    this.idCount$.subscribe((id) => {
      storageService.storage.idCount = id;
      // storageService.set('idCount', id);
    });
  }

  addProduct(name: Product['name'], price: Product['price']) {
    this.idCount$.update(id => id + 1);
    this.products$.update((products) => [...products, {
      id: this.idCount$.value, name, quantity: 1, price
    }]);
  }

  removeProducts(ids: Product['id'][]) {
    if (!ids.length) return;
    this.products$.update((products) => products.filter(p => !ids.includes(p.id)));
  }
}
