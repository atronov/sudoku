import { createSlice } from '@reduxjs/toolkit'

export type ControllerState = {
    selectedCell?: {i: number, j: number},
    isErrorState: boolean,
    isLockedState: boolean,
};

const initialState: ControllerState = {
    isErrorState: false,
    isLockedState: true,
};

const controllerSlice = createSlice({
    name: 'controller',
    initialState,
    reducers: {
        selectCell(state, action) {
            const {i, j} = action.payload;
            state.selectedCell = {i, j};
        },
        unselectCell(state) {
            state.selectedCell = undefined;
        }
    }
});

export const {selectCell, unselectCell} = controllerSlice.actions;
export const {reducer} = controllerSlice;
