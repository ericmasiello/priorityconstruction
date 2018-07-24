import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChevronIcon from './ChevronIcon';
import PageContainer from './PageContainer';
import Blockquote from './Blockquote';
import InvisibleButton from './InvisibleButton';
import Base from './Base';
import { COLORS } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const ShiftButton = InvisibleButton.extend`
  position: absolute;
  z-index: 2;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  ${ChevronIcon} {
    fill: ${COLORS.highlight};
    width: ${pxToRem(20)};
  }
`;

const PreviousButton = ShiftButton.extend`
  right: auto;
  left: 1.5rem;
  ${ChevronIcon} {
    transform: rotate(180deg);
  }
`;

export class Quotes extends Component {
  static propTypes = {
    className: PropTypes.string,
    quotes: PropTypes.arrayOf(
      PropTypes.shape({
        quote: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        title: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    quotes: [],
  };

  state = {
    selectedIndex: 0,
  };

  handleClickPrevious = () => {
    const nextIndex =
      this.state.selectedIndex === 0 ? this.props.quotes.length - 1 : this.state.selectedIndex - 1;
    this.setState({
      selectedIndex: nextIndex,
    });
  };

  handleClickNext = () => {
    const nextIndex =
      this.state.selectedIndex === this.props.quotes.length - 1 ? 0 : this.state.selectedIndex + 1;
    this.setState({
      selectedIndex: nextIndex,
    });
  };

  render() {
    const { className, quotes, ...rest } = this.props;
    if (quotes.length < 1) {
      return null;
    }
    return (
      <PageContainer className={className} {...rest}>
        {quotes.length > 1 && (
          <PreviousButton aria-label="Previous quote" onClick={this.handleClickPrevious}>
            <ChevronIcon />
          </PreviousButton>
        )}
        <Blockquote>
          <Blockquote.Quote>{quotes[this.state.selectedIndex].quote}</Blockquote.Quote>
          <Blockquote.Citation>
            <Base tag="h1">{quotes[this.state.selectedIndex].author}</Base>
            {quotes[this.state.selectedIndex].title && (
              <p>{quotes[this.state.selectedIndex].title}</p>
            )}
          </Blockquote.Citation>
        </Blockquote>
        {quotes.length > 1 && (
          <ShiftButton aria-label="Next quote" onClick={this.handleClickNext}>
            <ChevronIcon />
          </ShiftButton>
        )}
      </PageContainer>
    );
  }
}

export default styled(Quotes)`
  position: relative;
  background-color: ${COLORS.highlight3};
  color: #fff;
  padding: 2rem 4rem;

  ${Blockquote} {
    text-align: center;
  }

  ${Blockquote.Citation} > :last-child {
    margin-bottom: 0;
  }

  ${Base} {
    text-transform: uppercase;
    margin-bottom: 0;
  }
`;
