import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';
import * as CustomPropTypes from '../propTypes';
import { COLORS, MAX_CONTENT_WIDTH_PLUS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const BackgroundImage = styled(GatsbyImage)`
  transition: opacity 0.5s;
  width: 100%;
  height: 100%;
`;

export class Hero extends Component {
  static displayName = 'Hero';

  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    children: PropTypes.node,
    isFullHeight: PropTypes.bool,
    selectedImage: CustomPropTypes.ImageSharp.isRequired,
    bgColor: PropTypes.string,
    opacity: PropTypes.number,
    bgImages: PropTypes.arrayOf(CustomPropTypes.ImageSharp),
  };

  static defaultProps = {
    tag: 'header',
    bgColor: COLORS.bg,
    opacity: 1,
    bgImages: [],
  };

  componentDidUpdate = prevProps => {
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

  setRef = elm => {
    // eslint-disable-next-line react/no-find-dom-node
    this.elm = ReactDOM.findDOMNode(elm);
  };

  render() {
    const {
      bgColor,
      selectedImage,
      bgImages,
      isFullHeight,
      children,
      opacity,
      imgStyle,
      tag: Tag,
      ...rest
    } = this.props;

    return (
      <Tag ref={this.setRef} {...rest}>
        {children}
        {bgImages.map(image => (
          <BackgroundImage
            key={image.sizes.src}
            style={{
              opacity: selectedImage.sizes.src === image.sizes.src ? '1' : '0',
            }}
            sizes={image.sizes}
            opacity={opacity}
            imgStyle={imgStyle}
          />
        ))}
      </Tag>
    );
  }
}

export default styled(Hero)`
  background-color: ${props => props.bgColor};
  overflow: visible;
  position: relative;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH_PLUS)};
  margin-left: auto;
  margin-right: auto;
  @media (min-height: ${pxToRem(450)}) {
    height: ${({ isFullHeight }) => (isFullHeight ? '70vh' : '20vh')};
  }
  max-height: ${pxToRem(460)};

  .gatsby-image-outer-wrapper {
    position: absolute !important;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
`;
