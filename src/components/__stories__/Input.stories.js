/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Input from '../Input';

const stories = storiesOf('Input', module);

stories.add('default', () => (<Input />));
stories.add('with text', () => (<Input defaultValue="This is a value" />));
stories.add('with placeholder', () => (<Input placeholder="This is a placeholder" />));
