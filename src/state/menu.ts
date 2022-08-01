import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type MenuState = {
    isShown: boolean,
    state: 'default' | 'new_game',
};

const initialState: MenuState = {
    isShown: false,
    state: 'default',
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuAppearance(state, {payload}: PayloadAction<{isShown: boolean, showState?: MenuState['state']}>) {
            state.isShown = payload.isShown;
            state.state = payload.showState ? state.state : "default";
        },
        showNewGameMenu(state) {
            state.isShown = true;
            state.state = 'new_game';
        },
    },
});

export const {reducer} = menuSlice;
export const {showNewGameMenu, setMenuAppearance} = menuSlice.actions;
