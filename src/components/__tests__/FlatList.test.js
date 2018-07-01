import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FlatList from '../FlatList';

it('should render <FlatList>', () => {
  const component = renderer.create(<FlatList />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render <FlatList.Item>', () => {
  const component = renderer.create(<FlatList.Item />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
