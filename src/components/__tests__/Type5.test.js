import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Type5, { Type5 as Raw } from '../Type5';

it('should render', () => {
  const component = renderer.create(<Type5 />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render children', () => {
  const wrapper = shallow(<Raw>Test</Raw>);

  expect(wrapper.text()).toBe('Test');
});

it('should render additional props', () => {
  const wrapper = shallow(<Raw data-test="my-attribute" />);

  expect(wrapper.find('[data-test="my-attribute"]')).toHaveLength(1);
});

it('should display additional classes', () => {
  const wrapper = shallow(<Raw className="my-class" />);

  expect(wrapper.hasClass('my-class')).toBe(true);
});

it('should render as a <h5> by default', () => {
  const wrapper = shallow(<Raw />);

  expect(wrapper.type()).toBe('h5');
});

it('should render with a custom tag', () => {
  const wrapper = shallow(<Raw tag="span" />);

  expect(wrapper.type()).toBe('span');
});
