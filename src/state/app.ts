import {combineReducers} from 'redux';
import {reducer as controllerReducer} from 'state/controller';
import {reducer as gameReducer} from 'state/game';
import {reducer as menuReducer} from 'state/menu';

export const reducer = combineReducers({
    controller: controllerReducer,
    game: gameReducer,
    menu: menuReducer,
});

export type AppState = ReturnType<typeof reducer>
