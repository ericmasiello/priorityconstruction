/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Hero from '../Hero';
import Type1 from '../Type1';
import Button from '../Button';
import img from '../../images/bg.jpeg';

const stories = storiesOf('Hero', module);
const bg = {
  src: img,
};

stories.add('default', () => (
  <Hero bgImageSizes={bg} />
));

stories.add('with content', () => (
  <Hero bgImageSizes={bg}>
    <Type1>This is a title</Type1>
  </Hero>
));

class FullHeightDemo extends React.Component {
  state = { isFullHeight: false };
  handleToggle = () => this.setState({ isFullHeight: !this.state.isFullHeight })
  render() {
    return (
      <Hero bgImageSizes={bg} isFullHeight={this.state.isFullHeight}>
        <Button onClick={this.handleToggle}>Toggle</Button>
      </Hero>
    );
  }
}

stories.add('with full height', () => (
  <FullHeightDemo />
));
