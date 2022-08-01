import {UserDifficulty} from '../model/task-generaor';

export const difficultyToText: Readonly<Record<UserDifficulty, string>> = {
    'easy': 'Easy',
    'mid': 'Normal',
    'hard': 'Hard',
    'expert': 'Expert',
};

export const difficultyToIcon: Readonly<Record<UserDifficulty, string>> = {
    'easy': '👶',
    'mid': '🤔',
    'hard': '🤓',
    'expert': '🤖',
};

export function formatTime(time: number): string {
    const seconds = Math.floor(time / 1000);
    const hoursPart = Math.floor(seconds / 3600);
    const minutesPart = Math.floor((seconds % 3600) / 60);
    const secondsPart = seconds % 60;
    return String(hoursPart).padStart(2, '0')
        + ':' + String(minutesPart).padStart(2, '0')
        + ':' + String(secondsPart).padStart(2, '0');
}
