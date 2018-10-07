import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import Blockquote, { Blockquote as Raw } from '../Blockquote';

it('should render', () => {
  const component = renderer.create(<Blockquote />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render children', () => {
  const wrapper = mount(<Raw>Test</Raw>);

  expect(wrapper.text()).toContain('Test');
});

it('should render additional props', () => {
  const wrapper = shallow(<Raw data-test="my-attribute" />);

  expect(wrapper.find('[data-test="my-attribute"]')).toHaveLength(1);
});

it('should display additional classes', () => {
  const wrapper = shallow(<Raw className="my-class" />);

  expect(wrapper.hasClass('my-class')).toBe(true);
});

it('should render as a <blockquote> by default', () => {
  const wrapper = shallow(<Raw />);

  expect(wrapper.type()).toBe('blockquote');
});

it('should render with a custom tag', () => {
  const wrapper = shallow(<Raw tag="span" />);

  expect(wrapper.type()).toBe('span');
});
