/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '../Header';
import Type1 from '../Type1';
import Button from '../Button';
import img from '../../images/bg.jpeg';

const stories = storiesOf('Header', module);
const bg = {
  src: img,
};

stories.add('default', () => (
  <Header bgImageSizes={bg} />
));

stories.add('with content', () => (
  <Header bgImageSizes={bg}>
    <Type1>This is a title</Type1>
  </Header>
));

class FullHeightDemo extends React.Component {
  state = { isFullHeight: false };
  handleToggle = () => this.setState({ isFullHeight: !this.state.isFullHeight })
  render() {
    return (
      <Header bgImageSizes={bg} isFullHeight={this.state.isFullHeight}>
        <Button onClick={this.handleToggle}>Toggle</Button>
      </Header>
    );
  }
}

stories.add('with full height', () => (
  <FullHeightDemo />
));
