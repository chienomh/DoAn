import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { BillState } from './types';

export const initialState: BillState = {
  data: [],
  isOpenAlert: false,
  type: false,
};

const slice = createSlice({
  name: 'BillState',
  initialState,
  reducers: {
    handleCreateBill(state, action: PayloadAction<any>) {},

    handleCreateBillSuccess(state) {
      state.isOpenAlert = true;
      state.type = true;
    },

    handleCreateBillFaild(state) {
      state.isOpenAlert = true;
      state.type = false;
    },

    CloseAlert(state) {
      state.isOpenAlert = false;
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
