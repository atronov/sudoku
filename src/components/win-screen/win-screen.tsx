import React from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import {UserDifficulty} from '../../model/task-generaor';
import {Button} from '../../components/common/button';
import {difficultyToIcon, difficultyToText, formatTime} from 'lib/text';


type Props = {
    time?: number,
    userDifficulty: UserDifficulty,
    onClose?: () => void,
    isVisible: boolean,
    onNewGame: () => void,
    onTryAgain: () => void,
    isRetry: boolean,
};

const Container = styled.div<{isVisible: boolean}>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background: white;
    user-select: none;
    backface-visibility: hidden;
    pointer-events: none;
    transform: translateY(100%);
    transition: transform 0.2s;
    ${({isVisible}) => isVisible && css`
        transform: translateY(0);
        transition: transform 0.5s;
        pointer-events: auto;
    `}
`;

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
    text-align: center;
    font-size: 16px;
    margin-bottom: 8px;
`;

const WinTime = styled.span`
    font-size: 16px;
    margin-bottom: 8px;
`;

const WinDifficulty = styled.span`
    margin-bottom: 8px;
`;

const Close = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    line-height: 1;
    
    background: none;
    font-size: 100%;
    border: 0;
    padding: 0;
    color: inherit;
`;

const ScreenButton = styled(Button)`
    margin-bottom: 8px;
`;

export function WinScreen({time, userDifficulty, onClose, isVisible, onNewGame, onTryAgain, isRetry}: Props) {
    return ReactDOM.createPortal(
        <Container isVisible={isVisible}>
            {onClose && <Close onClick={onClose}>✖️</Close>}
            <CenterBlock>
                {isRetry ? (
                    <>
                        <WinIcon>👌</WinIcon>
                        <WinTitle>Not bad.<br/>But it was second try.</WinTitle>
                    </>
                ) : (
                    <>
                        <WinIcon>🤘</WinIcon>
                        <WinTitle>You are awesome!</WinTitle>
                    </>
                )}
                <WinDifficulty>{difficultyToIcon[userDifficulty]} {difficultyToText[userDifficulty]}</WinDifficulty>
                {
                    time !== undefined ? (<WinTime>⏰ {formatTime(time)}</WinTime>) : null
                }
            </CenterBlock>
            <ScreenButton onClick={onNewGame}>new game</ScreenButton>
            <ScreenButton onClick={onTryAgain}>try again</ScreenButton>
        </Container>,
        document.body
    );
}
