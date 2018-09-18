import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChevronIcon from './ChevronIcon';
import Blockquote from './Blockquote';
import InvisibleButton from './InvisibleButton';
import Base from './Base';
import { COLORS, PAGE_SPACING, MAX_CONTENT_WIDTH } from '../styles/vars';
import { pxToRem } from '../styles/utils';

const BREAKPOINT = 550;

const ShiftButton = styled(InvisibleButton)`
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

const PreviousButton = styled(ShiftButton)`
  right: auto;
  left: 1.5rem;
  ${ChevronIcon} {
    transform: rotate(180deg);
  }
`;

const TestimonialContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media (min-width: ${pxToRem(BREAKPOINT)}) {
    display: flex;
    transition: transform 0.7s;

    ${props => `
      width: calc(100vw * ${props.count});
      transform: translateX(${(100 / props.count) * -1 * props.index}%);
    `};
  }
`;

const TestimonialContainerItem = styled.li`
  display: flex;
  align-items: center;
  width: 100vw;
  padding-left: ${pxToRem(PAGE_SPACING.horizontal)};
  padding-right: ${pxToRem(PAGE_SPACING.horizontal)};

  @media (min-width: ${pxToRem(BREAKPOINT)}) {
    padding-left: ${pxToRem(60)};
    padding-right: ${pxToRem(60)};
  }

  ${Blockquote} {
    max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
    margin-left: auto;
    margin-right: auto;
    padding: 0;
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

export class TestimonialCarousel extends Component {
  static propTypes = {
    className: PropTypes.string,
    testimonials: PropTypes.arrayOf(
      PropTypes.shape({
        quote: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        title: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    testimonials: [],
  };

  state = {
    selectedIndex: 0,
  };

  handleClickPrevious = () => {
    this.setState(prevState => {
      const nextIndex =
        prevState.selectedIndex === 0
          ? this.props.testimonials.length - 1
          : prevState.selectedIndex - 1;

      return { selectedIndex: nextIndex };
    });
  };

  handleClickNext = () => {
    this.setState(prevState => {
      const nextIndex =
        prevState.selectedIndex === this.props.testimonials.length - 1
          ? 0
          : prevState.selectedIndex + 1;

      return {
        selectedIndex: nextIndex,
      };
    });
  };

  render() {
    const { className, testimonials, ...rest } = this.props;
    if (testimonials.length < 1) {
      return null;
    }
    return (
      <section className={className} {...rest}>
        {testimonials.length > 1 && (
          <PreviousButton aria-label="Previous testimonial" onClick={this.handleClickPrevious}>
            <ChevronIcon />
          </PreviousButton>
        )}
        <TestimonialContainer count={testimonials.length} index={this.state.selectedIndex}>
          {testimonials.map(testimonial => (
            <TestimonialContainerItem key={testimonial.quote}>
              <Blockquote>
                <Blockquote.Quote
                  tag="div"
                  dangerouslySetInnerHTML={{ __html: testimonial.quote }}
                />
                <Blockquote.Citation>
                  <Base tag="h1">{testimonial.author}</Base>
                  {testimonial.title && <p>{testimonial.title}</p>}
                </Blockquote.Citation>
              </Blockquote>
            </TestimonialContainerItem>
          ))}
        </TestimonialContainer>
        {testimonials.length > 1 && (
          <ShiftButton aria-label="Next testimonial" onClick={this.handleClickNext}>
            <ChevronIcon />
          </ShiftButton>
        )}
      </section>
    );
  }
}

export default styled(TestimonialCarousel)`
  position: relative;
  background-color: ${COLORS.highlight3};
  color: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;
  overflow: hidden;
`;
