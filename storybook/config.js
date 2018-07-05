/**
 * Config file for storybook
 */

/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, configure } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { setOptions } from '@storybook/addon-options';
import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import base from '../src/styles/base.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

setOptions({
  name: 'Priority Construction',
});

const req = require.context('../src/components', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const StoryWrapper = styled.div`
  padding: 20px;
`;

// Wrap all stories in decorator
addDecorator(story => (
  <MemoryRouter>
    <StoryWrapper>
      {story()}
    </StoryWrapper>
  </MemoryRouter>
));

configure(loadStories, module);
