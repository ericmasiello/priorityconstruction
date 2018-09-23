import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GatsbyImage from './GatsbyImage';
import FlatList from './FlatList';
import FlatListItem from './FlatListItem';
import InvisibleButton from './InvisibleButton';
import CloseIcon from './CloseIcon';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

const GalleryOverlayTileImageHeight = pxToRem(120);
const GalleryOverlayPrimaryImage = styled(GatsbyImage)`
  height: 100%;
`;
const GalleryOverviewList = styled(FlatList)`
  display: grid;
  grid-template-columns: repeat(10, minmax(150px, 1fr));
  grid-gap: 0.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0.5rem;

  .gatsby-image-outer-wrapper {
    position: absolute !important;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  ${GatsbyImage} {
    height: 100%;

    div {
      padding-bottom: 0 !important;
    }
  }
`;
const GalleryOverviewListItem = styled(FlatListItem)`
  &:not(:last-child) {
    margin-right: 0;
    margin-bottom: 0;
  }
`;
const GalleryOverviewCloseButton = styled(InvisibleButton)`
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;

  ${CloseIcon} {
    stroke: #fff;
  }
`;

const GalleryTileButton = styled(InvisibleButton)`
  height: 100%;
  width: 100%;
  position: relative;

  &[aria-pressed='true'] {
    &::before {
      content: '';
      position: absolute;
      left: -0.25rem;
      right: -0.25rem;
      top: -0.25rem;
      bottom: -0.25rem;
      border: 0.25rem solid #fff;
    }

    &:focus {
      outline: none;
    }
  }
`;

export class GalleryOverlay extends React.Component {
  static displayName = 'GalleryOverlay';

  static propTypes = {
    tag: CustomPropTypes.Tag,
    images: CustomPropTypes.AllImageSharp.isRequired,
    selectedIndex: PropTypes.number,
    onResetSelection: PropTypes.func,
    onSelectImage: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    tag: 'section',
  };

  state = { selectedIndex: this.props.selectedIndex || 0 };

  componentDidMount() {
    document.addEventListener('keydown', this.handleClose, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({ selectedIndex: nextProps.selectedIndex });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleClose, false);
  }

  handleSelectImageByIndex = selectedIndex => () => {
    this.setState({ selectedIndex });
    if (this.props.onSelectImage) {
      this.props.onSelectImage();
    }
  };

  handleResetSelection = () => {
    this.setState({ selectedIndex: null });
    if (this.props.onResetSelection) {
      this.props.onResetSelection();
    }
  };

  selectedImage = () => {
    if (this.state.selectedIndex === null) {
      return {
        sizes: {},
      };
    }

    const edge = this.props.images.edges[this.state.selectedIndex];
    return edge.node;
  };

  handleClose = event => {
    if (event.keyCode === 27 && this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const {
      tag: Tag,
      images,
      selectedIndex,
      onResetSelection,
      onSelectImage,
      ...rest
    } = this.props;
    return (
      <Tag {...rest}>
        <GalleryOverviewCloseButton onClick={this.handleResetSelection}>
          <CloseIcon />
        </GalleryOverviewCloseButton>
        <GalleryOverlayPrimaryImage sizes={this.selectedImage().sizes} />
        <GalleryOverviewList>
          {images.edges.map((edge, i) => (
            <GalleryOverviewListItem key={edge.node.id}>
              <GalleryTileButton
                onClick={this.handleSelectImageByIndex(i)}
                aria-pressed={i === this.state.selectedIndex}
              >
                <GatsbyImage sizes={edge.node.sizes} />
              </GalleryTileButton>
            </GalleryOverviewListItem>
          ))}
        </GalleryOverviewList>
      </Tag>
    );
  }
}

export default styled(GalleryOverlay)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.95);
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 100vh;
  display: grid;
  grid-template-rows: calc(100vh - ${GalleryOverlayTileImageHeight}) ${GalleryOverlayTileImageHeight};

  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`;
