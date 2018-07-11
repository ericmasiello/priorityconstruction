import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';
import * as CustomPropTypes from '../propTypes';
import { COLORS } from '../styles/vars';

const BackgroundImage = GatsbyImage.extend`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.opacity};
`;

export class Masthead extends Component {
  static displayName = 'Masthead';

  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    children: PropTypes.node,
    isFullHeight: PropTypes.bool,
    bgImage: CustomPropTypes.ImageSharp.isRequired,
    bgColor: PropTypes.string,
    opacity: PropTypes.number,
  };

  static defaultProps = {
    tag: 'div',
    bgColor: COLORS.bg,
    opacity: 1,
  };

  componentDidUpdate = (prevProps) => {
    const { isFullHeight } = this.props;
    if (isFullHeight !== prevProps.isFullHeight && this.elm && this.elm.animate) {
      if (isFullHeight) {
        this.elm.animate([{ height: '20vh' }, { height: '70vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        });
      } else {
        this.elm.animate([{ height: '70vh' }, { height: '20vh' }], {
          duration: 300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.86, 0, 0.07, 1)',
          iterations: 1,
        });
      }
    }
  };

  setRef = (elm) => {
    // eslint-disable-next-line react/no-find-dom-node
    this.elm = ReactDOM.findDOMNode(elm);
  };

  render() {
    const {
      bgColor,
      bgImage,
      isFullHeight,
      children,
      opacity,
      tag: Tag,
      ...rest
    } = this.props;

    return (
      <Tag ref={this.setRef} {...rest}>
        {children}
        <BackgroundImage
          style={{
            position: 'absolute',
          }}
          sizes={bgImage.sizes}
          opacity={opacity}
        />
      </Tag>
    );
  }
}

export default styled(Masthead)`
  background-color: ${props => props.bgColor};
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: ${({ isFullHeight }) => (isFullHeight ? '70vh' : '20vh')};
`;
