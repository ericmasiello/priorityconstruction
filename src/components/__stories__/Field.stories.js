/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Field from '../Field';
import Label from '../Label';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';

const stories = storiesOf('Field/Row', module);

stories.add('with label and input', () => (
  <Field>
    <Label htmlFor="name-row">First name</Label>
    <Input id="name-row" />
  </Field>
));

stories.add('with label and textarea', () => (
  <Field>
    <Label htmlFor="comments-row">Comments</Label>
    <Textarea id="comments-row" />
  </Field>
));

stories.add('with label and select', () => (
  <Field>
    <Label htmlFor="option-row">Options</Label>
    <Select id="option-row" defaultValue="third">
      <option value="first">First option</option>
      <option value="second">Second option</option>
      <option value="third">Third option</option>
      <option value="fourth">Fourth option</option>
    </Select>
  </Field>
));

const storiesStack = storiesOf('Field/Stack', module);

storiesStack.add('with label and input', () => (
  <Field stack>
    <Label htmlFor="name-stack">First name</Label>
    <Input id="name-stack" />
  </Field>
));

storiesStack.add('with label and textarea', () => (
  <Field stack>
    <Label htmlFor="comments-stack">Comments</Label>
    <Textarea id="comments-stack" />
  </Field>
));

storiesStack.add('with label and select', () => (
  <Field stack>
    <Label htmlFor="option-stack">Options</Label>
    <Select id="option-stack" defaultValue="third">
      <option value="first">First option</option>
      <option value="second">Second option</option>
      <option value="third">Third option</option>
      <option value="fourth">Fourth option</option>
    </Select>
  </Field>
));
