// Model to the product

export interface Product {
  id: number;
  imgPath: string;
  name: string;
  newProduct: boolean;
  onSale: boolean;
  stock: number;
  value: number;
}
