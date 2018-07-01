import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import Header, { Header as Raw } from '../Header';

const props = {
  bgImageSizes: {
    src: '/foo/bar.jpg',
  },
};

it('should render', () => {
  const component = renderer.create(<Header {...props} />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render children', () => {
  const wrapper = mount(<Raw {...props}>Test</Raw>);

  expect(wrapper.text()).toContain('Test');
});

it('should render additional props', () => {
  const wrapper = shallow(<Raw {...props} data-test="my-attribute" />);

  expect(wrapper.find('[data-test="my-attribute"]')).toHaveLength(1);
});

it('should display additional classes', () => {
  const wrapper = shallow(<Raw {...props} className="my-class" />);

  expect(wrapper.hasClass('my-class')).toBe(true);
});

it('should render as a <header> by default', () => {
  const wrapper = shallow(<Raw {...props} />);

  expect(wrapper.type()).toBe('header');
});

it('should render with a custom tag', () => {
  const wrapper = shallow(<Raw {...props} tag="span" />);

  expect(wrapper.type()).toBe('span');
});
