import {settings} from './settings';
import {generateTasks, UserDifficulty} from './task-generaor';
import {Grid} from './logic';

export class TaskGeneratorCache {

    private readonly gridSize: number;
    private tasksCache: {
        tasks: Record<UserDifficulty, Grid>,
        filledGrid: Grid,
    };

    constructor(gridSize: number) {
        this.gridSize = gridSize;
        this.tasksCache = generateCache(gridSize);
    }

    getTask(difficulty: UserDifficulty): {grid: Grid, filledGrid: Grid} {
        const cache = this.tasksCache;
        setTimeout(() => this.tasksCache = generateCache(this.gridSize), 0);
        return {
            grid: cache.tasks[difficulty],
            filledGrid: cache.filledGrid,
        };
    }
}

function generateCache(gridSize: number) {
    const difficultyHooks = Object.values(settings.userToDigitDifficulty);
    const genResult = generateTasks(gridSize, difficultyHooks);
    const taskGrids = genResult.tasks.map(task => task.grid);
    return {
        tasks: {
            easy: taskGrids[0],
            mid: taskGrids[1],
            hard: taskGrids[2],
            expert: taskGrids[3],
        },
        filledGrid: genResult.originGrid,
    };
}
