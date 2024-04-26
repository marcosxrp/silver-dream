// Model to the product in the cart

import { Product } from "./product.model";

// Add the cart quantity to the FirebaseData model
export interface CartProduct extends Product {
  cartQuantity: number;
}
