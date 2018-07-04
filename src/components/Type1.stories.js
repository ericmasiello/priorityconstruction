/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Type1 from './Type1';

const stories = storiesOf('Type1', module);

stories.add('Default', () => {
  const story = <Type1>Hello world</Type1>;
  return story;
});
