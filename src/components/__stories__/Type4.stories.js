/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Type4 from '../Type4';

const stories = storiesOf('Type4', module);

stories.add('default', () => (<Type4>Hello world</Type4>));
