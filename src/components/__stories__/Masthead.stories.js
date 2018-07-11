/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Masthead from '../Masthead';
import Type1 from '../Type1';
import Button from '../Button';
import img from '../../images/bg.jpeg';

const stories = storiesOf('Masthead', module);
const bg = {
  src: img,
};

stories.add('default', () => (
  <Masthead bgImageSizes={bg} />
));

stories.add('with content', () => (
  <Masthead bgImageSizes={bg}>
    <Type1>This is a title</Type1>
  </Masthead>
));

class FullHeightDemo extends React.Component {
  state = { isFullHeight: false };
  handleToggle = () => this.setState({ isFullHeight: !this.state.isFullHeight })
  render() {
    return (
      <Masthead bgImageSizes={bg} isFullHeight={this.state.isFullHeight}>
        <Button onClick={this.handleToggle}>Toggle</Button>
      </Masthead>
    );
  }
}

stories.add('with full height', () => (
  <FullHeightDemo />
));
