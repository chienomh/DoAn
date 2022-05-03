import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.BillState || initialState;

export const selectBill = createSelector([selectSlice], state => state);
