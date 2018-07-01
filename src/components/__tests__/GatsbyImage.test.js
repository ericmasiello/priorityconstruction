import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import GatsbyImage from '../GatsbyImage';

it('should render <GatsbyImage>', () => {
  const component = renderer.create(<GatsbyImage sizes={{ src: '/foo/bar.jpg' }} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
