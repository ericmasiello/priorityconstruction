/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from '../Select';

const stories = storiesOf('Select', module);

stories.add('default', () => (<Select />));
stories.add('with selection', () => (
  <Select value="red">
    <option />
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </Select>
));
