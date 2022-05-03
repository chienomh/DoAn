import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { ListProduct } from './types';

export const initialState: ListProduct = {
  data: [],
  param: {
    // branch: 0,
    // color: 0,
    // gender: 0,
    // material: 0,
    // offset: 0,
    // pageNumber: 0,
    // pageSize: 0,
    // product_name: '',
    // style: 0,
    // technology: 0,
  },
};

const slice = createSlice({
  name: 'ListProduct',
  initialState,
  reducers: {
    getListProduct(state, action: PayloadAction<any>) {},

    getListProductSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },

    changeParams(state, action: PayloadAction<any>) {
      state.param = action.payload;
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
