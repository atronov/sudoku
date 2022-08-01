// @ts-ignore
import {reduceGrid} from './solver';
import {Grid} from './logic';

export function solve(grid: Grid): Grid[] {
    const gridString = gridToInput(grid);
    const solutions = reduceGrid(gridString);
    return solutions.map(parseGridFromSolver);
}

function gridToInput(grid: Grid): string[] {
    return grid.reduce((input, line) => [...input, ...line])
        .map(item => item ? item.toString() : '.');
}

function parseGridFromSolver(solution: number[]): Grid {
    const gridLength = Math.sqrt(solution.length);
    return new Array<number>(gridLength).fill(0).map((_, i) =>
        new Array<number>(gridLength).fill(0).map((_, j) => solution[i * gridLength + j]));
}
