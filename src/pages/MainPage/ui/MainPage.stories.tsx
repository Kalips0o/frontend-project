import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import MainPage from './MainPage';

export default {
    title: 'pages/MainPage',
    component: MainPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof MainPage>;

const Template: StoryFn<typeof MainPage> = () => <MainPage />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({ counter: { value: 0 } })];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ counter: { value: 0 } }),
];
