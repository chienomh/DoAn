import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { Authen } from './types';

export const initialState: Authen = {
  loading: false,
  data: {},
  typeError: false,
  openMessage: false,
};

const slice = createSlice({
  name: 'Authen',
  initialState,
  reducers: {
    register(state, action: PayloadAction<any>) {},
    registerSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
      state.typeError = true;
      state.openMessage = true;
    },
    registerFaild(state) {
      state.loading = false;
      state.typeError = false;
      state.openMessage = true;
    },

    closeMessagae(state) {
      state.openMessage = false;
    },
  },
});

export const { actions: ActionsAuthent } = slice;

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
