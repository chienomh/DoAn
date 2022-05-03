import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.ListProducts || initialState;

export const selectProduct = createSelector([selectSlice], state => state);
