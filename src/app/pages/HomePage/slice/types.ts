/* --- STATE --- */
export interface product {
  description: string;
  id: number;
  image: string;
  manufacturer: string;
  name: string;
  price: number;
  sold_quantity: number;
  total_quantity: number;
  total_rating: number;
  total_star: number;
}

export interface ListProducts {
  data: product[];
}
