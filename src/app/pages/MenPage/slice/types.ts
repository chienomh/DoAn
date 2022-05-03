/* --- STATE --- */
export interface ListProduct {
  data: any[];
  param: {
    branch?: number;
    color?: number;
    gender?: number;
    material?: number;
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    product_name?: string;
    style?: number;
    technology?: number;
  };
}
