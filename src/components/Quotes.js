import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContainer from './PageContainer';
import Blockquote from './Blockquote';
import Base from './Base';
import { COLORS } from '../styles/vars';


export class Quotes extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  state = {};
  
  render() {
    return (
      <PageContainer className={this.props.className}>
        <Blockquote>
          <Blockquote.Quote>
            General Paving and Contracting, Inc. regularly use Priority Construction Corp. on a
            range of construction projects. Priority&rsquo;s crews are punctual and highly skilled
            in a variety of concrete jobs. Over the years, they have proven to be easy to work with
            and have consistently performed excellent work.
          </Blockquote.Quote>
          <Blockquote.Citation>
            <Base tag="h1">Robert L. Quinn, Jr.</Base>
            <p>General Paving & Contracting, Inc., Halethorpe, Maryland</p>
          </Blockquote.Citation>
        </Blockquote>
      </PageContainer>
    );
  }
}

export default styled(Quotes)`
  background-color: ${COLORS.highlight3};
  color: #fff;
  padding-top: 2rem;
  padding-bottom: 2rem;

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
`