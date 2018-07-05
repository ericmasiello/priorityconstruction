/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import List from '../List';

const stories = storiesOf('List', module);

stories.add('empty', () => (
  <List />
));

stories.add('with a few items', () => (
  <List>
    <List.Item>Red</List.Item>
    <List.Item>Green</List.Item>
    <List.Item>Blue</List.Item>
  </List>
));

stories.add('with several items', () => (
  <List>
    <List.Item>Red</List.Item>
    <List.Item>Green</List.Item>
    <List.Item>Blue</List.Item>
    <List.Item>Orange</List.Item>
    <List.Item>Purple</List.Item>
    <List.Item>Black</List.Item>
    <List.Item>White</List.Item>
    <List.Item>Teal</List.Item>
    <List.Item>Beige</List.Item>
  </List>
));
