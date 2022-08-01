import React, {useMemo} from 'react';
import {SudokuTools} from '../components/sudoku-tools/sudoku-tools';
import {AppState} from 'state/app';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {clearTip, undo, setDigit, setTip} from 'state/game';
import {setMenuAppearance} from 'state/menu';
import {selectAvailableDigits, selectIsWin} from 'lib/selectors';
import {settings} from '../model/settings';

export function SudokuToolsContainer() {
    const dispatch = useDispatch();
    const availableDigits = useSelector(selectAvailableDigits);
    const isWin = useSelector(selectIsWin);
    const {selectedCell, grid, tips} = useSelector(
            ({game: {grid, tips}, controller: {selectedCell}}: AppState) => ({grid, tips, selectedCell}));
    const handleSetDigit = useCallback((digit: number) => {
        if (selectedCell) {
            dispatch(setDigit({digit, i: selectedCell.i, j: selectedCell.j}));
        }
    }, [dispatch, selectedCell]);
    const handleMenuShow = useCallback(() => {
        dispatch(setMenuAppearance({isShown: true}));
        // pause timer
    }, [dispatch]);
    const handleSetTip = useCallback((tipDigit: number) => {
        if (selectedCell) {
            const {i, j} = selectedCell;
            const curTips = tips[selectedCell.i][selectedCell.j];
            if (!curTips.includes(tipDigit)) {
                dispatch(setTip({tipDigit, i, j}));
            } else {
                dispatch(clearTip({tipDigit, i, j}));
            }
        }
    }, [dispatch, selectedCell, tips]);
    const handleUndo = useCallback(() => dispatch(undo()), [dispatch]);
    return (
        <SudokuTools
            numbersLimit={grid.length}
            availableDigits={settings.allowPutOnlyAvailableDigits ? availableDigits : undefined}
            onSetDigit={handleSetDigit}
            onSetTip={handleSetTip}
            onUndo={handleUndo}
            onMenu={handleMenuShow}
            isWin={isWin}
        />
    );
};
