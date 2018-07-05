/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Base from '../Base';

const stories = storiesOf('Base', module);

stories.add('default', () => (<Base>Hello world</Base>));
