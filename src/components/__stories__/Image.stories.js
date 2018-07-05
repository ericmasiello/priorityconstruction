/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from '../Image';
import img from '../../images/priorityconstructionlogo.jpg';

const stories = storiesOf('Image', module);

stories.add('default', () => (<Image src={img} />));
