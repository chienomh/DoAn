import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { ListProducts } from './types';

export const initialState: ListProducts = {
  data: [],
};

const slice = createSlice({
  name: 'ListProducts',
  initialState,
  reducers: {
    getData(state) {},

    getDataSuccess(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },

    getDataFaild(state, action: PayloadAction<any>) {},
  },
});

export const { actions: ActionsProducts } = slice;

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
