import {
    checkAllDigitsSeq,
    generateGrid,
    isValidGrid,
    iterateColumn,
    iterateSector, shuffle,
    swapSmallColumns, swapSmallRows,
    transpose,
    swapBigColumns,
    swapBigRows, isOrdered,
} from './logic';
import {product} from './iterables';

describe('generateGrid', () => {
    it('is square', () => {
        const size = 3;
        const grid = generateGrid(size);
        const sideLength = size*size;
        expect(grid).toHaveLength(sideLength);
        grid.forEach(line => expect(line).toHaveLength(sideLength));
    });

    it('is valid', () => {
        const size = 3;
        const grid = generateGrid(size);
        expect(isValidGrid(grid)).toBeTruthy();
    });
});

describe('iterateColumn', () => {
    it('first column', () => {
        const size = 2;
        const grid = generateGrid(size);
        const columnFromIterator = Array.from(iterateColumn(grid, 0));
        expect(columnFromIterator).toEqual([
            grid[0][0],
            grid[1][0],
            grid[2][0],
            grid[3][0],
        ]);
    });

    it('last column', () => {
        const size = 2;
        const grid = generateGrid(size);
        expect(Array.from(iterateColumn(grid, 3))).toEqual([
            grid[0][3],
            grid[1][3],
            grid[2][3],
            grid[3][3],
        ]);
    });

    it('mid column', () => {
        const size = 2;
        const grid = generateGrid(size);
        expect(Array.from(iterateColumn(grid, 1))).toEqual([
            grid[0][1],
            grid[1][1],
            grid[2][1],
            grid[3][1],
        ]);
    });
});

describe('iterateSector', () => {
    it('first sector', () => {
        const size = 2;
        const grid = generateGrid(size);
        expect(Array.from(iterateSector(grid, 0))).toEqual([
            grid[0][0],
            grid[0][1],
            grid[1][0],
            grid[1][1],
        ]);
    });

    it('last sector', () => {
        const size = 2;
        const grid = generateGrid(size);
        expect(Array.from(iterateSector(grid, 3))).toEqual([
            grid[2][2],
            grid[2][3],
            grid[3][2],
            grid[3][3],
        ]);
    });

    it('mid sector', () => {
        const size = 3;
        const grid = generateGrid(size);
        expect(Array.from(iterateSector(grid, 4))).toEqual([
            grid[3][3],
            grid[3][4],
            grid[3][5],
            grid[4][3],
            grid[4][4],
            grid[4][5],
            grid[5][3],
            grid[5][4],
            grid[5][5],
        ]);
    });
});

describe('checkAllDigitsSeq', () => {
    it('positive case', () => {
        const digits = [1, 2, 3, 7, 5, 4, 6];
        expect(checkAllDigitsSeq(digits, digits.length)).toBeTruthy();
    });

    it('negative', () => {
        const digits = [1, 2, 3, 7, 5, 8, 6];
        expect(checkAllDigitsSeq(digits, digits.length)).toBeFalsy();
    });

    it('shorter', () => {
        const digits = [1, 2, 5, 3, 5, 4, 6];
        expect(checkAllDigitsSeq(digits, digits.length)).toBeFalsy();
    });

    it('longer', () => {
        const digits = [1, 2, 3, 7, 5, 9, 6, 4];
        expect(checkAllDigitsSeq(digits, digits.length)).toBeFalsy();
    });
});

describe('isValidGrid', () => {
    it('positive', () => {
        const grid = [
            [1, 2, 3, 4],
            [3, 4, 1, 2],
            [2, 3, 4, 1],
            [4, 1, 2, 3],
        ];
        expect(isValidGrid(grid)).toBeTruthy();
    });

    it('negative', () => {
        const grid = [
            [1, 2, 3, 4],
            [3, 4, 1, 2],
            [2, 3, 4, 1],
            [4, 1, 2, 2],
        ];
        expect(isValidGrid(grid)).toBeFalsy();
    });
});

describe('transpose', () => {
    const grid = [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
    ];
    const transposedGrid = [
        [1, 3, 2, 4],
        [2, 4, 3, 1],
        [3, 1, 4, 2],
        [4, 2, 1, 3],
    ];

    it('works', () => {
        expect(transpose(grid)).toEqual(transposedGrid);
    });

    it('makes valid grid', () => {
        expect(isValidGrid(transpose(grid))).toBeTruthy();
    });
});

describe('swapSmallColumns', () => {
    const grid = generateGrid();
    it('makes valid grid', () =>
        expect(isValidGrid(swapSmallColumns(grid))).toBeTruthy()
    );
    it('changes origin', () =>
        expect(swapSmallColumns(grid)).not.toEqual(grid)
    );
});

describe('swapSmallRows', () => {
    const grid = generateGrid();
    it('makes valid grid', () =>
        expect(isValidGrid(swapSmallRows(grid))).toBeTruthy()
    );
    it('changes origin', () =>
        expect(swapSmallRows(grid)).not.toEqual(grid)
    );
});

describe('swapBigColumns', () => {
    const grid = generateGrid();
    it('makes valid grid', () => {
        expect(isValidGrid(swapBigColumns(grid))).toBeTruthy()
    });
    it('changes origin', () =>
        expect(swapBigColumns(grid)).not.toEqual(grid)
    );
});

describe('swapBigRows', () => {
    const grid = generateGrid();
    it('makes valid grid', () =>
        expect(isValidGrid(swapBigRows(grid))).toBeTruthy()
    );
    it('changes origin', () =>
        expect(swapBigRows(grid)).not.toEqual(grid)
    );
});

describe('shuffle', () => {
    const grid = generateGrid();
    it('makes valid grid', () =>
        expect(isValidGrid(shuffle(grid))).toBeTruthy()
    );
    it('changes origin', () =>
        expect(shuffle(grid)).not.toEqual(grid)
    );
    it('has no vertically sequences', () => {
        const shuffledGrid = shuffle(grid);
        for (let i = 0; i < grid.length; i++) {
            const columnIterator = iterateColumn(shuffledGrid, i);
            expect(isOrdered(columnIterator, 1, grid.length)).toBeFalsy();
        }
    });
    it('has no horizontal sequences', () => {
        const shuffledGrid = shuffle(grid);
        for (let i = 0; i < grid.length; i++) {
            const row = shuffledGrid[i];
            expect(isOrdered(row, 1, grid.length)).toBeFalsy();
        }
    });
});

describe('product', () => {
    const source1 = [1, 2, 3];
    const source2 = [4, 5];

    it('has correct length', () => {
        expect(Array.from(product(source1, source2))).toHaveLength(source1.length * source2.length);
    });

    it('works', () => {
        expect(Array.from(product(source1, source2))).toEqual([
            [1, 4],
            [1, 5],
            [2, 4],
            [2, 5],
            [3, 4],
            [3, 5],
        ]);
    });
});

describe('isOrdered', () => {
    it('detects simple order', () => {
        expect(isOrdered([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 9)).toBeTruthy();
    });
    it('detects simple mis-order', () => {
        expect(isOrdered([1, 2, 3, 5, 4, 6, 7, 8, 9], 1, 9)).toBeFalsy();
    });
    it('detects simple order, that start not from first item', () => {
        expect(isOrdered([6, 7, 8, 9, 1, 2, 3, 4, 5], 1, 9)).toBeTruthy();
    });
    it('detects simple mis-order, that start not from first item', () => {
        expect(isOrdered([6, 8, 7, 9, 1, 2, 3, 4, 5], 1, 9)).toBeFalsy();
    });
});
