import React from 'react';
import styled from 'styled-components';
import {UserDifficulty} from '../../model/task-generaor';
import {formatTime} from 'lib/text';


const HeaderContainer = styled.header`
    width: 100%;
    max-width: 500px;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    margin: 0 auto;
    box-sizing: border-box;
`;

const DifficultyText = styled.span`
    font-size: 16px;
`;

const TimeText = styled.span`
    font-size: 14px;
`;

const NumbersText = styled.span`
    font-size: 14px;
`;

type Props = {
    time?: number,
    difficulty: UserDifficulty,
};

const difficultyToText: Record<UserDifficulty, string> = {
    'easy': 'Easy',
    'mid': 'Middle',
    'hard': 'Hard',
    'expert': 'Expert',
};

export function Header({time, difficulty}: Props) {
    return (
        <HeaderContainer>
            <DifficultyText>{difficultyToText[difficulty]}</DifficultyText>
            <NumbersText />
            {
                (time !== undefined) ? (
                    <TimeText>{formatTime(time)}</TimeText>
                ) : null
            }
        </HeaderContainer>
    );
}
