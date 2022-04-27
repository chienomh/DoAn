import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.Authen || initialState;

export const selectAuthent = createSelector([selectSlice], state => state);
