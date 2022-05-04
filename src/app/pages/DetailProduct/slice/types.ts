/* --- STATE --- */
export interface listSize {
  id: number;
  name: number;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  gender: number;
  branch: number;
  style: number;
  color: number;
  material: number;
  technology: number;
  price: number;
  total_quantity: number;
  sold_quantity: number;
  description: string;
  manufacturer: string;
  total_rating: number;
  total_star: number;
  image: string;
  listSize: listSize[];
}

export interface DetailProduct {
  data: Product;
  card: number;
  openAlert: boolean;
  dataReview: any[];
}
