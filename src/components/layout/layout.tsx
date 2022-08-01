import 'normalize.css';

import React from 'react';
import styled from 'styled-components';
import {FieldContainer} from 'containers/field-container';
import {SudokuToolsContainer} from 'containers/sudoku-tools-container';
import { createGlobalStyle } from "styled-components"
import {Menu2Container} from 'containers/menu2-container';
import {HeaderContainer} from 'containers/header-container';
import {useSelector} from 'react-redux';
import {AppState} from 'state/app';
import {WinScreenContainer} from 'containers/win-screen-container';
import {WelcomeScreenContainer} from 'containers/welcome-screen-container';
import {FullScreen} from "components/common/screen";import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Arial, sans-serif;
  }
  button:focus {
    outline: none;
  }
`;

const Container = styled(FullScreen)`
     justify-content: space-between;
`;

const Head = styled.div`
    width: 100%;
    height: 12vmin;
    min-height: 36px;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    flex: 0 1 auto;
`;

const Mid = styled.div`
    flex: 0 1 auto;
`;

const Bottom = styled.div`
    flex: 1 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
`;

type Props = {

};

export function Layout({}: Props) {
    return (
        <>
            {/* Router is needed here for feature usage with different pages */}
            <Router>
                <GlobalStyle />
                <Menu2Container />
                <Routes>
                    <Route path={'/'} element={
                        <CurrentScreen />
                    } />
                </Routes>
            </Router>
        </>
    );
}

function GameScreen() {
    return (
        <Container>
            <Head>
                <HeaderContainer />
            </Head>
            <Mid>
                <FieldContainer />
            </Mid>
            <Bottom>
                <SudokuToolsContainer/>
            </Bottom>
        </Container>
    );
}

function CurrentScreen() {
    const gameInProgress = useSelector(({game}: AppState) => !!game.currentUserDifficulty);
    return (
        <>
            {gameInProgress ? (
                <>
                    <GameScreen />
                    <WinScreenContainer />
                </>
            ) : (
                <WelcomeScreenContainer />
            )}
        </>
    );
}
