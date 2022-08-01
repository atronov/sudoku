import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {range} from '../../model/iterables';
import {Button} from '../../components/common/button';

const ToolsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
`;

const ToolsNumbers = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ToolsCommonButton = styled(Button)<{isSelected?: boolean}>`
    min-width: 30px;
    min-height: 30px;
    max-width: 40px;
    max-height: 40px;
    width: calc(10vw - 2px);
    height: calc(10vw - 2px);
    display: inline-flex;
    background-color: ${props => (props.isSelected ? '#a9aac6' : '#efefef')}
`;

const ToolsButtons = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
`;

const Spaceer = styled.div<{size: number}>`
    flex: ${({size}) => size} 0;
`;

const ButtonContent = styled.span`
    margin: auto;
`;

const TB = ({children, ...rest}: React.ComponentProps<typeof Button>) => {
    return (
        <ToolsCommonButton {...rest}>
            <ButtonContent>{children}</ButtonContent>
        </ToolsCommonButton>
    );
};

const ToolsButton = styled(TB)`
    margin: 2px;
`;

type ToolsMode = 'main' | 'tips';

type Props = {
    numbersLimit: number,
    availableDigits?: number[],
    onSetDigit: (digit: number) => void,
    onSetTip: (digit: number) => void,
    onUndo: () => void,
    onMenu: () => void,
    isWin: boolean,
};

const SudokuTools = React.memo(({numbersLimit, availableDigits, onSetDigit, onSetTip, onMenu, onUndo}: Props) => {
    const [mode, setMode] = useState<ToolsMode>('main');
    const handleSetMode = useCallback(() => setMode(mode === 'tips' ? 'main' : 'tips'), [mode, setMode]);
    const handleSetDigit = useCallback((digit: number) => {
        if (mode === 'main') {
            onSetDigit(digit);
        } else if (mode === 'tips') {
            onSetTip(digit);
        }
    }, [mode, onSetDigit, onSetTip]);
    const handleErase = useCallback(() => onSetDigit(0), [onSetDigit]);
    return (
        <ToolsContainer>
            <Spaceer size={3} />
            <ToolsNumbers>
                {[...range(numbersLimit, 1)]
                    .map(number => ({
                        number,
                        isDisabled: mode === 'main' && !(availableDigits?.includes(number) ?? true),
                    }))
                    .map(({number, isDisabled}) => (
                        <ToolsButton
                            key={number}
                            disabled={isDisabled}
                            onClick={() => handleSetDigit(number)}
                        >{number}</ToolsButton>
                    )
                )}
            </ToolsNumbers>
            <Spaceer size={1} />
            <ToolsButtons>
                <ToolsButton onClick={onMenu}>⚙️</ToolsButton>
                <ToolsButton onClick={onUndo}>↩️</ToolsButton>
                <ToolsButton onClick={handleErase}>❌</ToolsButton>
                <ToolsButton isSelected={mode === 'tips'} onClick={handleSetMode}>✏️</ToolsButton>
            </ToolsButtons>
            <Spaceer size={2} />
        </ToolsContainer>
    );
});

export {SudokuTools as SudokuTools};
