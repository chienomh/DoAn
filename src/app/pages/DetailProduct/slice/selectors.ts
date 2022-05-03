import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.DetailProduct || initialState;

export const selectDetailProduct = createSelector(
  [selectSlice],
  state => state,
);
