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

const HORIZONTAL_PADDING = 4;
const BREAKPOINT = 550;

const ShiftButton = InvisibleButton.extend`
  display: none;
  @media (min-width: ${pxToRem(BREAKPOINT)}) {
    display: block;
  }
  position: absolute;
  z-index: 3;
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

const QuoteContainer = styled.div`
  @media (min-width: ${pxToRem(BREAKPOINT)}) {
    display: flex;
    transition: transform 0.7s;

    ${props => `
      width: calc((100vw * ${props.count}) - ${HORIZONTAL_PADDING * 2 * props.count}rem);
      transform: translateX(${(100 / props.count) * -1 * props.index}%);
    `};
  }

  ${Blockquote} {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    &:not(:last-child) {
      margin-bottom: 3rem;
    }

    @media (min-width: ${pxToRem(BREAKPOINT)}) {
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }
  }

  ${Blockquote.Citation} > :last-child {
    margin-bottom: 0;
  }

  ${Base} {
    text-transform: uppercase;
    margin-bottom: 0;
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
        <QuoteContainer count={quotes.length} index={this.state.selectedIndex}>
          {quotes.map(quote => (
            <Blockquote key={quote.quote}>
              <Blockquote.Quote tag="div" dangerouslySetInnerHTML={{ __html: quote.quote }} />
              <Blockquote.Citation>
                <Base tag="h1">{quote.author}</Base>
                {quote.title && <p>{quote.title}</p>}
              </Blockquote.Citation>
            </Blockquote>
          ))}
        </QuoteContainer>
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
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media (min-width: ${pxToRem(BREAKPOINT)}) {
    padding-left: ${HORIZONTAL_PADDING}rem;
    padding-right: ${HORIZONTAL_PADDING}rem;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: ${HORIZONTAL_PADDING}rem;
      background-color: ${COLORS.highlight3};
      z-index: 2;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }
  }
`;
