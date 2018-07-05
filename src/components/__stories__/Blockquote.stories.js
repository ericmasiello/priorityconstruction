/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Blockquote from '../Blockquote';

const stories = storiesOf('Blockquote', module);

stories.add('default', () => (
  <Blockquote>
    <p>
      From their professional conduct in an office setting to their diligent experts in the field,
      Priority Construction makes working with them easy...
    </p>
  </Blockquote>
));
