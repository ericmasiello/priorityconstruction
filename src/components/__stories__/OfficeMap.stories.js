/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import OfficeMap from '../OfficeMap';

const stories = storiesOf('OfficeMap', module);

stories.add('default', () => (<OfficeMap />));
