import {createSelector} from 'reselect';
import {cellToSectorInd, isSameGrids, iterateColumn, iterateSector} from '../model/logic';
import {AppState} from 'state/app';
import {range} from '../model/iterables';

export const selectGrid = ({game: {grid}}: AppState) => grid;
export const selectFilledGrid = ({game: {filledGrid}}: AppState) => filledGrid;
export const selectSelectedCell = ({controller: {selectedCell}}: AppState) => selectedCell;

export const selectIsWin = createSelector(selectGrid, selectFilledGrid,(grid, filledGrid) => {
    const isAllFill = grid.flat().every(digit => digit !== 0);
    return isAllFill && !!filledGrid && isSameGrids(grid, filledGrid);
});

export const selectAvailableDigits = createSelector(selectGrid, selectSelectedCell, (grid, selectedCell) => {
    const availableDigits = new Set(range(grid.length, 1));
    if (selectedCell) {
        for (let digit of grid[selectedCell.i]) {
            availableDigits.delete(digit);
        }
        for (let digit of iterateColumn(grid, selectedCell.j)) {
            availableDigits.delete(digit);
        }
        for (let digit of iterateSector(grid, cellToSectorInd(grid, selectedCell))) {
            availableDigits.delete(digit);
        }
    }
    return [...availableDigits.values()];
});
