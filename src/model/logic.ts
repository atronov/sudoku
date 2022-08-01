import {randomUInt, range} from './iterables';

export type Grid = Array<Array<number>>;
export type Tips = Array<Array<number[]>>;
export type OneTaskResult = { grid: Grid, factDifficulty: number };
export type TasksResult = {
    originGrid: Grid,
    tasks: OneTaskResult[],
}

export function generateEmptyGrid(n = 3): Grid {
    return new Array<number>(n * n).fill(0).map(() =>
        new Array<number>(n * n).fill(0)
    );
}

export function generateGrid(n = 3): Grid {
    return generateEmptyGrid(n).map((line, i) => line.map((_, j) => ((i * n + Math.floor(i / n) + j) % (n * n) + 1)));
}

export function cloneGrid(origin: Grid): Grid {
    return origin.map((line) => [...line]);
}

export function generateEmptyTips(n = 3): Tips {
    return new Array(n * n).fill(null).map(() =>
        new Array(n * n).fill(null).map(() => new Array(n * n).fill(0))
    );
}

export function transpose(grid: Grid): Grid {
    return grid.map((_, i) => ([...iterateColumn(grid, i)]));
}

function genRowsToSwapInSameSector(grid: Grid): {row1: number, row2: number} {
    const lineRandLimit = Math.sqrt(grid.length);
    const bigRow = randomUInt(lineRandLimit);
    const row1 = bigRow * lineRandLimit + randomUInt(lineRandLimit);
    let row2 = bigRow * lineRandLimit + randomUInt(lineRandLimit);
    let counter = 0;
    while (row2 === row1 && counter < lineRandLimit) {
        row2 = bigRow * lineRandLimit + randomUInt(lineRandLimit);
        counter++;
    }
    return {row1, row2};
}

export function swapSmallRows(grid: Grid): Grid {
    const {row1, row2} = genRowsToSwapInSameSector(grid);
    return grid.map((row, i) => {
        if (i === row1) {
            return grid[row2];
        } else if (i === row2) {
            return grid[row1];
        } else {
            return row;
        }
    });
}

export function swapSmallColumns(grid: Grid): Grid {
    return transpose(swapSmallRows(transpose(grid)));
}

export function swapBigRows(grid: Grid): Grid {
    const bigRowsCount = Math.sqrt(grid.length);
    const row1 = randomUInt(bigRowsCount);
    let row2 = randomUInt(bigRowsCount);
    let counter = 0;
    while (row1 === row2 && counter < bigRowsCount) {
        row2 = randomUInt(bigRowsCount);
        counter++;
    }
    return grid.map((row, i) => {
        if (~~(i / bigRowsCount) === row1) {
            return grid[row2 * bigRowsCount + (i % bigRowsCount)];
        } else if (~~(i / bigRowsCount) === row2) {
            return grid[row1 * bigRowsCount +(i % bigRowsCount)];
        } else {
            return row;
        }
    });
}

export function swapBigColumns(grid: Grid): Grid {
    return transpose(swapBigRows(transpose(grid)));
}

export function isValidGrid(grid: Grid): boolean {
    const {length} = grid;
    for (let i = 0; i < grid.length; i++) {
        if (
            !checkAllDigitsSeq(grid[i], length)
            || !checkAllDigitsSeq(iterateColumn(grid, i), length)
            || !checkAllDigitsSeq(iterateSector(grid, i), length)
        ) {
            return false;
        }
    }
    return true;
}

export function isSameGrids(grid1: Grid, grid2: Grid): boolean {
    for (let i = 0; i < grid1.length; i++) {
        for (let j = 0; j < grid1.length; j++) {
            if (grid1[i][j] !== grid2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

export function* iterateColumn(grid: Grid, columnInd: number): Iterable<number> {
    if (columnInd >= 0 && columnInd < grid.length) {
        for (let i = 0; i < grid.length; i++) {
            yield grid[i][columnInd];
        }
    }
}

export function* iterateSector(grid: Grid, sectorInd: number): Iterable<number> {
    if (sectorInd >= 0 && sectorInd < grid.length) {
        const sectorSize = Math.sqrt(grid.length);
        const firstColumn = sectorSize * sectorInd % grid.length;
        const firstLine = Math.floor(sectorInd / sectorSize) * sectorSize;
        for (let i = firstLine; i < firstLine + sectorSize; i++) {
            for (let j = firstColumn; j < firstColumn + sectorSize; j++) {
                yield grid[i][j];
            }
        }
    }
}

export function cellToSectorInd(grid: Grid, {i, j}: {i: number, j: number}): number {
    const sectorsInRow = Math.sqrt(grid.length);
    const sectorI = Math.floor(i / sectorsInRow);
    const sectorJ = Math.floor(j / sectorsInRow);
    return sectorI * sectorsInRow + sectorJ;
}

export function checkAllDigitsSeq(digits: Iterable<number>, length: number): boolean {
    const restDigits = new Set(range(length, 1));
    for (let digit of digits) {
        if (!restDigits.has(digit)) {
            return false;
        }
        restDigits.delete(digit);
    }
    return restDigits.size === 0;
}

export function shuffle(grid: Grid, attempts: number = 100): Grid {
    const processors: Array<(grid: Grid) => Grid> = [
        transpose,
        swapSmallRows,
        swapSmallColumns,
        swapBigColumns,
        swapBigRows,
    ];
    let newGrid = grid;
    for (let i = 0; i < attempts; i++) {
        const operationInd = Math.floor(Math.random() * processors.length);
        newGrid = processors[operationInd](newGrid);
    }
    return newGrid;
}

export function isOrdered(sequence: Iterable<number>, minValue: number, maxValue: number): boolean {
    let sequentNumbersCount = 0;
    let totalCount = 0;
    let prevDigit = -1;
    for (let digit of sequence) {
        if (prevDigit !== -1) {
            if (prevDigit === maxValue && digit === minValue) {
                sequentNumbersCount++;
            } else if (prevDigit === digit - 1) {
                sequentNumbersCount++;
            }
        } else {
            sequentNumbersCount = 1;
        }
        prevDigit = digit;
        totalCount++;
    }
    return sequentNumbersCount === totalCount;
}
