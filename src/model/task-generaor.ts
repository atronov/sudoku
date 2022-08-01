import {settings} from './settings';
import {solve} from './solver-adapter';
import {cloneGrid, generateGrid, OneTaskResult, shuffle, TasksResult} from './logic';
import {uniqueRandomUint} from './iterables';

export const userToDigitDifficulty = {
    'easy': 72,
    'mid': 55,
    'hard': 28,
    'expert': 24,
};

export type UserDifficulty = keyof typeof settings.userToDigitDifficulty;

export function generateTask(size: number = 3, difficulty: number = 20): OneTaskResult {
    return generateTasks(size, [difficulty]).tasks[0];
}

export function generateTasks(size: number = 3, difficultyHooks: number[] = [20]): TasksResult {
    const originGrid = shuffle(generateGrid(size));
    const grid = cloneGrid(originGrid);
    let curDifficulty = size ** 4;
    const uniqRandom = uniqueRandomUint(curDifficulty);
    const hooksSet = new Set(difficultyHooks);
    const results: TasksResult = {
        originGrid,
        tasks: [],
    };
    const minDifficulty = Math.min(...difficultyHooks);
    for (let randomCellInd of uniqRandom) {
        const cellI = Math.floor(randomCellInd / size ** 2);
        const cellJ = randomCellInd % (size ** 2);
        const cellValue = grid[cellI][cellJ];
        grid[cellI][cellJ] = 0;
        curDifficulty--;
        const solutions = solve(grid);
        if (solutions.length !== 1) {
            curDifficulty++;
            grid[cellI][cellJ] = cellValue;
        }
        if (curDifficulty <= minDifficulty) {
            results.tasks.push({grid, factDifficulty: curDifficulty});
            break;
        }
        if (hooksSet.has(curDifficulty)) {
            results.tasks.push({grid: cloneGrid(grid), factDifficulty: curDifficulty});
            hooksSet.delete(curDifficulty);
        }
    }
    if (results.tasks.length < difficultyHooks.length) {
        results.tasks.push({grid, factDifficulty: curDifficulty});
    }
    return results;
}

