import React from 'react';
import styled from 'styled-components';
import {Button} from '../../components/common/button';
import {FullScreen} from '../../components/common/screen';


type Props = {
    onNewGame: () => void,
    onMenu: () => void,
};

const CenterBlock = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`;

const WinIcon = styled.div`
    font-size: 64px;
`;

const WinTitle = styled.span`
    font-size: 24px;
`;

const WinText = styled.span`
    font-size: 16px;
`;

export function WelcomeScreen({onNewGame}: Props) {
    return (
        <FullScreen>
            <CenterBlock>
                <WinIcon>🤖</WinIcon>
                <WinTitle>Try sudoku!</WinTitle>
                <WinText>Challenge your brain</WinText>
            </CenterBlock>
            <Button onClick={onNewGame}>new game</Button>
        </FullScreen>
    );
}
