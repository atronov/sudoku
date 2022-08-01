import {generateTask} from './task-generaor';
import {solve} from './solver-adapter';

describe('generateTask', () => {
    const targetDifficulty = 25;
    const gridSize = 3;
    it('generates task wth single solution', () => {
        const {grid: taskGrid} = generateTask(gridSize, targetDifficulty);
        const solutions = solve(taskGrid);
        expect(solutions).toHaveLength(1);
    });
    it('generates task that has expected difficulty', () => {
        const difficultyTolerance = 0.2;
        const {factDifficulty} = generateTask(gridSize, targetDifficulty);
        expect(factDifficulty).toBeGreaterThanOrEqual((1 - difficultyTolerance) * targetDifficulty);
        expect(factDifficulty).toBeLessThanOrEqual((1 + difficultyTolerance) * targetDifficulty);
    });
    it('generates tasks where difficulty is number of non-zero cells', () => {
        const {factDifficulty, grid} = generateTask(gridSize, targetDifficulty);
        const nonZeroCellsCount = grid.flat(1).filter(Boolean).length;
        expect(nonZeroCellsCount).toEqual(factDifficulty);
    });
});
