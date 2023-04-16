import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;


const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    profile: {
        form: {
            username: 'Kolomyaka',
            first_name: 'Nikita',
            last_name: 'Kolomoycev',
            age: 22,
            country: Country.Russia,
            currency: Currency.RUB,
            city: 'Saint-Petersburg',
            avatar: 'https://gravatar.com/avatar/d79a01fc6611be42996b4f3a6994?s=400&d=monsterid&r=x'
        }
    }
})];

