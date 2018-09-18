import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import FlatListItem from '../FlatListItem';

it('should render <FlatListItem>', () => {
  const component = renderer.create(<FlatListItem />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
