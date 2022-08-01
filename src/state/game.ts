import {generateEmptyGrid, generateEmptyTips, Grid, Tips} from '../model/logic';
import {UserDifficulty} from '../model/task-generaor';
import * as Comlink from 'comlink';
import {TaskGeneratorCache} from '../model/task-generator-cache';
import {createSlice, PayloadAction, current, createAsyncThunk} from '@reduxjs/toolkit';

const taskGeneratorCache = Comlink.wrap<TaskGeneratorCache>(
    new Worker(new URL('../worker.ts', import.meta.url), {type: "module"})
);

type GameHistory = Array<{tips: Tips, grid: Grid}>;

type GameState = {
    grid: Grid,
    tips: Tips,
    sourceGrid: Grid,
    filledGrid?: Grid,
    history: GameHistory,
    currentUserDifficulty?: UserDifficulty,
    inRetry: boolean,
};

const gridSize = 3;

const initialState: GameState = (() => {
    const emptyGreed = generateEmptyGrid(gridSize);
    return {
        grid: emptyGreed,
        tips: generateEmptyTips(gridSize),
        sourceGrid: emptyGreed,
        history: [],
        inRetry: false,
    };
})();

export const newGame = createAsyncThunk('game/newGame', async (userDifficulty: UserDifficulty) => {
    const {grid, filledGrid} = await taskGeneratorCache.getTask(userDifficulty);
    return {userDifficulty, grid, filledGrid};
});

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setDigit(state, {payload}: PayloadAction<{digit: number, i: number, j: number}>) {
            const {i, j, digit} = payload;
            if (digit === 0 && state.sourceGrid[i][j]) {
                return;
            }
            snapshotStateMutable(state);
            state.grid[i][j] = digit;
        },
        setTip(state,  {payload}: PayloadAction<{tipDigit: number, i: number, j: number}>) {
            const {i, j, tipDigit} = payload;
            snapshotStateMutable(state);
            state.tips[i][j][tipDigit - 1] = tipDigit;
        },
        clearTip(state,  {payload}: PayloadAction<{tipDigit: number, i: number, j: number}>) {
            const {i, j, tipDigit} = payload;
            snapshotStateMutable(state);
            state.tips[i][j][tipDigit - 1] = 0;
        },
        undo(state) {
            const prevState = state.history.pop();
            if (prevState) {
                state.grid = prevState.grid;
                state.tips = prevState.tips;
            }
        },
        retry(state) {
            return  {
                grid: state.sourceGrid,
                history: [],
                sourceGrid: state.sourceGrid,
                filledGrid: state.filledGrid,
                tips: generateEmptyTips(Math.sqrt(state.sourceGrid.length)),
                currentUserDifficulty: state.currentUserDifficulty,
                inRetry: true,
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(newGame.fulfilled, (state, {payload}) => {
            const {grid: newGrid, filledGrid, userDifficulty} = payload;
            return {
                grid: newGrid,
                history: [],
                sourceGrid: newGrid,
                filledGrid,
                tips: generateEmptyTips(Math.sqrt(newGrid.length)),
                currentUserDifficulty: userDifficulty,
                inRetry: false,
            };
        });
    }
});

export const {reducer} = gameSlice;
export const {
    retry,
    setDigit,
    setTip,
    clearTip,
    undo,
} = gameSlice.actions;

/**
 * Due to we use immer-js here. We need to mutate state, instead of creation new.
 * @param state
 */
function snapshotStateMutable(state: GameState): void {
    // we cannot just copy values from state, because it's not a plain object.
    // It's immer-js draft.
    const {grid, tips} = current(state);
    state.history.push({grid, tips});
}
