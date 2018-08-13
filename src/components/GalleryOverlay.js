import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GatsbyImage from '../components/GatsbyImage';
import FlatList from '../components/FlatList';
import InvisibleButton from '../components/InvisibleButton';
import CloseIcon from '../components/CloseIcon';
import { pxToRem } from '../styles/utils';
import * as CustomPropTypes from '../propTypes';

const GalleryOverlayTileImageHeight = pxToRem(120);
const GalleryOverlayPrimaryImage = GatsbyImage.extend`
  height: 100%;
`;
const GalleryOverviewList = FlatList.extend`
  display: grid;
  grid-template-columns: repeat(10, minmax(150px, 1fr));
  grid-gap: 0.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0.5rem;

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${GatsbyImage} {
    height: 100%;

    div {
      padding-bottom: 0 !important;
    }
  }
`;
GalleryOverviewList.Item = FlatList.Item.extend`
  &:not(:last-child) {
    margin-right: 0;
  }
`;
const GalleryOverviewCloseButton = InvisibleButton.extend`
  position: absolute;
  z-index: 3;
  top: 1rem;
  right: 1rem;
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.5rem;

  ${CloseIcon} {
    stroke: #fff;
  }
`;

const GalleryTileButton = InvisibleButton.extend`
  height: 100%;
  width: 100%;
`;

// TODO: add a white border around the selected image
export class GalleryOverlay extends React.Component {
  static displayName = 'GalleryOverlay';
  static propTypes = {
    tag: CustomPropTypes.Tag,
    images: CustomPropTypes.AllImageSharp.isRequired,
    selectedIndex: PropTypes.number,
    onResetSelection: PropTypes.func,
    onSelectImage: PropTypes.func,
  };

  static defaultProps = {
    tag: 'section',
  };

  state = { selectedIndex: this.props.selectedIndex || 0 };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({ selectedIndex: nextProps.selectedIndex });
    }
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
            <GalleryOverviewList.Item key={edge.node.id}>
              <GalleryTileButton onClick={this.handleSelectImageByIndex(i)}>
                <GatsbyImage sizes={edge.node.sizes} />
              </GalleryTileButton>
            </GalleryOverviewList.Item>
          ))}
        </GalleryOverviewList>
      </Tag>
    );
  }
}

export default styled(GalleryOverlay)`
  position: absolute;
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
