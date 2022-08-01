import {ComponentStory, ComponentMeta} from '@storybook/react';
import React from 'react';
import {Field} from './field';

const tips = [
    [[1, 0, 0, 5, 6, 7], [], [], [], [], [], [], [0, 0, 0, 4], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [1, 2, 3, 4, 5, 0, 0, 8, 0], []],
];
const grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
    [0, 5, 0, 7, 0, 0, 0, 0, 0],
    [7, 8, 0, 1, 0, 3, 0, 5, 0],
    [0, 3, 4, 0, 6, 0, 0, 0, 0],
    [5, 0, 7, 0, 0, 0, 0, 3, 0],
    [0, 0, 0, 2, 0, 0, 0, 0, 7],
    [0, 4, 5, 0, 0, 0, 0, 0, 0],
    [0, 7, 8, 0, 0, 0, 3, 4, 0],
    [9, 0, 0, 0, 0, 0, 6, 0, 8],
];

export default {
    title: "Field",
    component: Field,
    args: {
        grid,
        tips,
        sourceGreed: grid,
        selectedCell: {i: 5, j: 4},
    },
} as ComponentMeta<typeof Field>;

const Template: ComponentStory<typeof Field> = (args) => <Field {...args} />;

export const SimpleField = Template.bind({});
SimpleField.args = {};
