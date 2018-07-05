/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Type2 from '../Type2';

const stories = storiesOf('Type2', module);

stories.add('default', () => (<Type2>Hello world</Type2>));
