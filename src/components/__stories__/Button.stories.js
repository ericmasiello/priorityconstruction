/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../Button';

const stories = storiesOf('Button', module);

stories.add('default', () => (<Button />));
stories.add('with text', () => (<Button>I have text</Button>));
stories.add('with click handler', () => (<Button onClick={action('clicked')}>Click me</Button>));
