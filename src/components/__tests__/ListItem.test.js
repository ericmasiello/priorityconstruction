import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import ListItem, { ListItem as RawListItem } from '../ListItem';

it('should render <ListItem>', () => {
  const component = renderer.create(<ListItem />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render children', () => {
  const wrapper = shallow(<RawListItem>Test</RawListItem>);

  expect(wrapper.text()).toBe('Test');
});

it('should render additional props', () => {
  const wrapper = shallow(<RawListItem data-test="my-attribute" />);

  expect(wrapper.find('[data-test="my-attribute"]')).toHaveLength(1);
});

it('should display additional classes', () => {
  const wrapper = shallow(<RawListItem className="my-class" />);

  expect(wrapper.hasClass('my-class')).toBe(true);
});

it('should render as a <li> by default', () => {
  const wrapper = shallow(<RawListItem />);

  expect(wrapper.type()).toBe('li');
});

it('should render with a custom tag', () => {
  const wrapper = shallow(<RawListItem tag="span" />);

  expect(wrapper.type()).toBe('span');
});
