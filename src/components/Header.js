import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GatsbyImage from './GatsbyImage';

const BackgroundImage = GatsbyImage.extend`
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
`;

export class Header extends Component {
  static displayName = 'Header';

  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    children: PropTypes.node,
    isFullHeight: PropTypes.bool,
    bgImageSizes: PropTypes.shape({
      src: PropTypes.string.isRequired,
      base64: PropTypes.string,
      aspectRatio: PropTypes.number,
      sizes: PropTypes.string,
      srcSet: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    tag: 'header',
  };

  componentDidUpdate = (prevProps) => {
    const { isFullHeight } = this.props;
    if (isFullHeight !== prevProps.isFullHeight) {
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

  render() {
    const {
      bgImageSizes,
      isFullHeight,
      children,
      tag: Tag,
      ...rest
    } = this.props;
    return (
      <Tag
        ref={(elm) => {
          // eslint-disable-next-line react/no-find-dom-node
          this.elm = ReactDOM.findDOMNode(elm);
        }}
        {...rest}
      >
        <HeaderContainer>
          {children}
        </HeaderContainer>
        <BackgroundImage
          style={{
            position: 'absolute',
          }}
          sizes={bgImageSizes}
        />
      </Tag>
    );
  }
}

export default styled(Header)`
  background: #524763;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: ${({ isFullHeight }) => (isFullHeight ? '70vh' : '20vh')};
  h1 {
    img {
      height: 80px;
    }
  }
`

