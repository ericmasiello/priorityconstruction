import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import typeComponentFactory from '../typeComponentFactory';
import { TYPE_SIZE } from '../../styles/vars';

it('should create a renderable styled component', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1);
  const component = renderer.create(<Wrapper.StyledType />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should create a renderable component', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1);
  const component = renderer.create(<Wrapper.Type />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should set the text to uppercase', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1);
  const component = renderer.create(<Wrapper.StyledType uppercase />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should set the text to bold', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1);
  const component = renderer.create(<Wrapper.StyledType weight="bold" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render a <div /> by default', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1);
  const wrapper = shallow(<Wrapper.Type />);

  expect(wrapper.type()).toBe('div');
});

it('should allow the default tag to be customized', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1, { defaultTag: 'span' });
  const wrapper = shallow(<Wrapper.Type />);

  expect(wrapper.type()).toBe('span');
});

it('should set custom displayName', () => {
  const Wrapper = typeComponentFactory(TYPE_SIZE.t1, { displayName: 'Foo' });

  expect(Wrapper.Type.displayName).toBe('Foo');
});
