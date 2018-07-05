/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Small from '../Small';

const stories = storiesOf('Small', module);

stories.add('default', () => (<Small>Hello world</Small>));
