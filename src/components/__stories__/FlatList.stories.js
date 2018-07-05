/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import FlatList from '../FlatList';

const stories = storiesOf('FlatList', module);

stories.add('empty', () => (
  <FlatList />
));

stories.add('with a few items', () => (
  <FlatList>
    <FlatList.Item>Red</FlatList.Item>
    <FlatList.Item>Green</FlatList.Item>
    <FlatList.Item>Blue</FlatList.Item>
  </FlatList>
));

stories.add('with several items', () => (
  <FlatList>
    <FlatList.Item>Red</FlatList.Item>
    <FlatList.Item>Green</FlatList.Item>
    <FlatList.Item>Blue</FlatList.Item>
    <FlatList.Item>Orange</FlatList.Item>
    <FlatList.Item>Purple</FlatList.Item>
    <FlatList.Item>Black</FlatList.Item>
    <FlatList.Item>White</FlatList.Item>
    <FlatList.Item>Teal</FlatList.Item>
    <FlatList.Item>Beige</FlatList.Item>
  </FlatList>
));
