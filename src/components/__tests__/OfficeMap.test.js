import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import OfficeMap, { OfficeMap as Raw } from '../OfficeMap';

it('should render', () => {
  const component = renderer.create(<OfficeMap mapKey="foo" />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render children', () => {
  const wrapper = shallow(<Raw mapKey="foo">Test</Raw>);

  expect(wrapper.text()).toBe('Test');
});

it('should render additional props', () => {
  const wrapper = shallow(<Raw mapKey="foo" data-test="my-attribute" />);

  expect(wrapper.find('[data-test="my-attribute"]')).toHaveLength(1);
});

it('should display additional classes', () => {
  const wrapper = shallow(<Raw mapKey="foo" className="my-class" />);

  expect(wrapper.hasClass('my-class')).toBe(true);
});

it('should render as a <iframe>', () => {
  const wrapper = shallow(<Raw mapKey="foo" />);

  expect(wrapper.type()).toBe('iframe');
});
