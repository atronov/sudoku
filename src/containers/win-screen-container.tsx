import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {showNewGameMenu} from 'state/menu';
import {WinScreen} from '../components/win-screen/win-screen';
import {AppState} from 'state/app';
import {selectIsWin} from 'lib/selectors';
import {retry} from 'state/game';
import {useAppDispatch} from 'state/store';

export function WinScreenContainer({}) {
    const dispatch = useAppDispatch();
    const handleNewGame = useCallback(() => dispatch(showNewGameMenu()), [dispatch]);
    const handleRetry = useCallback(() => {
        dispatch(retry());
        // start timer here
    }, [dispatch])
    const [difficulty, isRetry] = useSelector(({game}: AppState) => ([game.currentUserDifficulty, game.inRetry] as const));
    const isVisible = useSelector(selectIsWin);
    if (!difficulty) {
        return null;
    }
    return (
        <WinScreen
            userDifficulty={difficulty}
            isVisible={isVisible}
            onNewGame={handleNewGame}
            onTryAgain={handleRetry}
            isRetry={isRetry}
            /* provide time here when implemented */
        />
    );
}
