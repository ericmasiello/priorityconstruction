/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Textarea from '../Textarea';

const stories = storiesOf('Textarea', module);

stories.add('default', () => (<Textarea />));
stories.add('with text', () => (<Textarea defaultValue="This is a value" />));
stories.add('with placeholder', () => (<Textarea placeholder="This is a placeholder" />));
