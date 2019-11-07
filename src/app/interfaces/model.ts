export interface location{
  lat: number;
  lng: number;

}
export interface Product{
   id: number;
   name: string;
   image: string;
   price: number;
   category_id: number;
   portion_size: number,
   allergens: string;
   file_name: string;
   created_at: string;
   supplement: string;
   updated_at: string;
   description:string;
}

export interface Category{
  id: number;
  name: string;
  file_name: string;
  image: string;
  icon_name: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface Order{
  id: number;
  comment: string;
  customer_id: number;
  paymethod: string;
  product_id: number;
  total_price: number;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

export interface Bonus{
  id: number;
  title: string;
  description: string;
  points: number;
  plates: number;
  enabled: number;
}

export interface PeriodicElement {
    position: number;
    comment: string;
    payment: string;
    transactionId: string;
    price: number;
    actions: string;
}

export interface  ModalData{
  id: number;
  kind: string;
}