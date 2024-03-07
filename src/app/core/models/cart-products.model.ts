import { FirebaseData } from "./firebase-data.model";

export interface CartProduct extends FirebaseData {
  cartQuantity: number;
}
