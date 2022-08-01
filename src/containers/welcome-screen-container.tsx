import React, {useCallback} from 'react';
import {WelcomeScreen} from '../components/welcome-screen/welcome-screen';
import {setMenuAppearance, showNewGameMenu} from 'state/menu';
import {useAppDispatch} from 'state/store';

export function WelcomeScreenContainer() {
    const dispatch = useAppDispatch();
    const handleNewGame = useCallback(() => dispatch(showNewGameMenu()), [dispatch]);
    const handleMenu = useCallback(() => dispatch(setMenuAppearance({isShown: true})), [dispatch]);
    return (
        <WelcomeScreen onNewGame={handleNewGame} onMenu={handleMenu} />
    );
}
