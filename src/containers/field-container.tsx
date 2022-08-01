import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {shallowEqual} from '@babel/types';
import {AppState} from 'state/app';
import {Field} from '../components/field/field';
import {selectCell} from 'state/controller';

export function FieldContainer() {
    const dispatch = useDispatch();
    const {grid, tips, selectedCell, sourceGrid} = useSelector((state: AppState) => {
        const {game: {grid, tips, sourceGrid}, controller: {selectedCell}} = state;
        return {
            grid,
            tips,
            sourceGrid,
            selectedCell,
        };
    }, shallowEqual);
    const handleCellSelect = useCallback((i: number, j: number) => dispatch(selectCell({i, j})), [dispatch]);
    return (
        <Field
            grid={grid}
            sourceGreed={sourceGrid}
            tips={tips}
            selectedCell={selectedCell}
            onCellSelect={handleCellSelect}
        />
    );
}
