import {ComponentStory, ComponentMeta} from '@storybook/react';
import React, {useState} from 'react';
import {
    MemoryRouter as Router,
} from 'react-router-dom';
import {Menu2} from './menu2';

export default {
    title: 'Menu2',
    component: Menu2,
} as ComponentMeta<typeof Menu2>;

const Template: ComponentStory<typeof Menu2> = (args) => {
    const [isVisible, setVisibility] = useState(false);
    const newArgs = {
        ...args,
        isOpen: isVisible,
        onStateChange: (menuState: boolean) => setVisibility(menuState),
    };
    return (
        <Router>
            <button onClick={() => setVisibility(true)}>show menu</button>
            <Menu2 {...newArgs} />
        </Router>
    );
};

export const Default = Template.bind({});
Default.args = {
    menuState: 'default'
};

export const NewGame = Template.bind({});
NewGame.args = {
    menuState: 'new_game'
};
