/**
 * Config file for storybook
 */

/* eslint-disable import/no-extraneous-dependencies */
import { addDecorator, configure } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { setOptions } from '@storybook/addon-options';
import React from 'react';
import { injectGlobal } from 'styled-components';
import base from '../src/styles/base.css';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  ${base}
`;

// Include any global CSS (standard CSS, not CSS Modules)
// import '../src/layouts/index.css';

setOptions({
  name: 'Priority Construction',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
});

const req = require.context('../src/components', true, /stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Wrap all stories in decorator
addDecorator(story => (
  <MemoryRouter>
    {story()}
  </MemoryRouter>
));

configure(loadStories, module);
