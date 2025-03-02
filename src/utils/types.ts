export type Product = {
  readonly id: number,
  name: string,
  quantity: number,
  price: number
};

export type ProductList = Array<Product>;

export type ReceiptStorage = {
  newProduct: Pick<Product, 'name' | 'price'>,
  products: ProductList,
  idCount: Product['id']
};