import { Authen } from 'app/pages/authentication/slice/types';
import { BillState } from 'app/pages/CardPage/slice/types';
import { DetailProduct } from 'app/pages/DetailProduct/slice/types';
import { ListProducts } from 'app/pages/HomePage/slice/types';
import { ListProduct } from 'app/pages/MenPage/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  Authen?: Authen;
  ListProducts?: ListProducts;
  DetailProduct?: DetailProduct;
  ListProduct?: ListProduct;
  BillState?: BillState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
