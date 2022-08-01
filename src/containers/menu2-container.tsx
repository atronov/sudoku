import React, {useCallback} from 'react';
import {UserDifficulty} from '../model/task-generaor';
import {newGame, retry} from 'state/game';
import {setMenuAppearance} from 'state/menu';
import {AppState} from 'state/app';
import {Menu2} from '../components/menu2';
import {useSelector} from 'react-redux';
import {useAppDispatch} from 'state/store';

export function Menu2Container() {
    const dispatch = useAppDispatch();
    const handleNewGame = useCallback((userDifficulty: UserDifficulty) => {
        dispatch(newGame(userDifficulty));
        // start timer here
    } , [dispatch]);
    const handleStateChange = useCallback((menuShowState: boolean) => {
        dispatch(setMenuAppearance({isShown: menuShowState}));
        // pause or resume timer here
    }, [dispatch]);
    const handleRetry = useCallback(() => dispatch(retry()), [dispatch]);
    const {isShown, state} = useSelector(({menu: {isShown, state}}: AppState) => ({isShown, state}));
    return (
        <Menu2
            onNewGame={handleNewGame}
            onStateChange={handleStateChange}
            onRetry={handleRetry}
            isOpen={isShown}
            menuState={state}
        />
    )
}
