import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Field, { Field as Raw } from '../Field';
import Label from '../Label';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';

it('should render', () => {
  const component = renderer.create(<Field />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render as stack', () => {
  const component = renderer.create(<Field stack />);

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

it('should render as a <div> by default', () => {
  const wrapper = shallow(<Raw />);

  expect(wrapper.type()).toBe('div');
});

it('should render with a custom tag', () => {
  const wrapper = shallow(<Raw tag="span" />);

  expect(wrapper.type()).toBe('span');
});

describe('nameAs', () => {
  it('should apply the htmlFor attribute to <Label />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Label>Label</Label>
      </Raw>,
    );

    expect(wrapper.find(Label).props().htmlFor).toBe('foo');
  });

  it('should preserve custom htmlFor on <Label />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Label htmlFor="bar">Label</Label>
      </Raw>,
    );

    expect(wrapper.find(Label).props().htmlFor).toBe('bar');
  });

  it('should apply the id attribute to <Input />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Input />
      </Raw>,
    );

    expect(wrapper.find(Input).props().id).toBe('foo');
  });

  it('should preserve custom id on <Input />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Input id="bar" />
      </Raw>,
    );

    expect(wrapper.find(Input).props().id).toBe('bar');
  });

  it('should apply the name attribute to <Input />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Input />
      </Raw>,
    );

    expect(wrapper.find(Input).props().name).toBe('foo');
  });

  it('should preserve custom name on <Input />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Input name="bar" />
      </Raw>,
    );

    expect(wrapper.find(Input).props().name).toBe('bar');
  });

  it('should apply the id attribute to <Textarea />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Textarea />
      </Raw>,
    );

    expect(wrapper.find(Textarea).props().id).toBe('foo');
  });

  it('should preserve custom id on <Textarea />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Textarea id="bar" />
      </Raw>,
    );

    expect(wrapper.find(Textarea).props().id).toBe('bar');
  });

  it('should apply the name attribute to <Textarea />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Textarea />
      </Raw>,
    );

    expect(wrapper.find(Textarea).props().name).toBe('foo');
  });

  it('should preserve custom name on <Textarea />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Textarea name="bar" />
      </Raw>,
    );

    expect(wrapper.find(Textarea).props().name).toBe('bar');
  });

  //

  it('should apply the id attribute to <Select />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Select />
      </Raw>,
    );

    expect(wrapper.find(Select).props().id).toBe('foo');
  });

  it('should preserve custom id on <Select />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Select id="bar" />
      </Raw>,
    );

    expect(wrapper.find(Select).props().id).toBe('bar');
  });

  it('should apply the name attribute to <Select />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Select />
      </Raw>,
    );

    expect(wrapper.find(Select).props().name).toBe('foo');
  });

  it('should preserve custom name on <Select />', () => {
    const wrapper = shallow(
      <Raw nameAs="foo">
        <Select name="bar" />
      </Raw>,
    );

    expect(wrapper.find(Select).props().name).toBe('bar');
  });
});
