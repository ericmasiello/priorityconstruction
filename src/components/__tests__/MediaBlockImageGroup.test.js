import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import StyledMediaBlockImageGroup, { MediaBlockImageGroup } from '../MediaBlockImageGroup';

it('should render', () => {
  const wrapper = shallow(<MediaBlockImageGroup />);

  expect(wrapper).toHaveLength(1);
});

it('should render default styles', () => {
  const component = renderer.create(<StyledMediaBlockImageGroup />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it('should set grid styles when rendering more than one image', () => {
  const component = renderer.create(<StyledMediaBlockImageGroup size={2} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it('should render an apporpriate number of grid rows', () => {
  const component = renderer.create(<StyledMediaBlockImageGroup size={10} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it('should render styles for the last image when displaying an odd number of images', () => {
  const component = renderer.create(<StyledMediaBlockImageGroup size={3} />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
