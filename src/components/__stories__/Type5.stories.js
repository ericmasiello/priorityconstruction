/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Type5 from '../Type5';

const stories = storiesOf('Type5', module);

stories.add('default', () => (<Type5>Hello world</Type5>));
