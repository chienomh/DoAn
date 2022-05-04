import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { DetailProduct } from './types';

export const initialState: DetailProduct = {
  data: {
    id: 0,
    name: '',
    gender: 0,
    branch: 0,
    style: 0,
    color: 0,
    material: 0,
    technology: 0,
    price: 0,
    total_quantity: 0,
    sold_quantity: 0,
    description: '',
    manufacturer: '',
    total_rating: 0,
    total_star: 0,
    image: '',
    listSize: [],
  },
  card: 0,
  openAlert: false,
  dataReview: [],
};

const slice = createSlice({
  name: 'DetailProduct',
  initialState,
  reducers: {
    getProductDetail(state, action: PayloadAction<any>) {},

    getProductDetailSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },

    getProductDetailFaild(state) {},

    setTotalCard(state, action: PayloadAction<number>) {
      state.card = action.payload;
    },

    handleGetReview(state, action: PayloadAction<number>) {},

    handleGetReviewSuccess(state, action: PayloadAction<any>) {
      state.dataReview = action.payload;
    },

    openAlert(state) {
      state.openAlert = true;
    },

    closeAlert(state) {
      state.openAlert = false;
    },
  },
});

export const { actions: Actions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
