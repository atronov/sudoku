import React from 'react';
import {Header} from '../components/header';
import {useSelector} from 'react-redux';
import {AppState} from 'state/app';


export function HeaderContainer() {
    const {difficulty} = useSelector(({game}: AppState) => ({difficulty: game.currentUserDifficulty}));
    if (!difficulty) {
        return null;
    }
    return <Header
        difficulty={difficulty}
        /* add timer here when it's implemented */
    />
}
