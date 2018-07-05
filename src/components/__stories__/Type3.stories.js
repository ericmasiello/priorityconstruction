/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Type3 from '../Type3';

const stories = storiesOf('Type3', module);

stories.add('default', () => (<Type3>Hello world</Type3>));
