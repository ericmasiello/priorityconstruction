import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinyColor from 'tinycolor2';
import PageContainer from '../components/PageContainer';
import MarkdownBlock from '../components/MarkdownBlock';
import TrophyIcon from '../components/TrophyIcon';
import Type4 from '../components/Type4';
import * as CustomPropTypes from '../propTypes';
import { pxToRem } from '../styles/utils';
import { TYPE_SIZE, COLORS } from '../styles/vars';

const Intro = styled(MarkdownBlock)`
  font-size: ${pxToRem(TYPE_SIZE.t4[0])};
  line-height: ${TYPE_SIZE.t4[1]};
  text-align: center;
  margin-bottom: 3rem;

  ul {
    columns: 2;
  }
`;

const Awards = styled.section`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  margin-bottom: 3rem;

  ${MarkdownBlock} {
    padding: 2rem;
    border: 1px solid ${COLORS.gray};
    background-color: ${tinyColor(COLORS.gray)
      .setAlpha(0.2)
      .toRgbString()};
  }
`;

const AwardHeader = styled.header`
  justify-self: center;
  text-align: center;
`;

const AwardIcon = styled(TrophyIcon)`
  fill: #333e4f;
  width: ${pxToRem(104)};
`;

class About extends React.PureComponent {
  static displayName = 'About';

  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.shape({
      mission: CustomPropTypes.Markdown,
      history: CustomPropTypes.Markdown,
      certifications: CustomPropTypes.Markdown,
      intro: CustomPropTypes.Markdown,
      awards: CustomPropTypes.Markdown,
    }),
  };

  render() {
    const { className, data } = this.props;

    return (
      <PageContainer tag="section" className={className}>
        <Intro tag="section" dangerouslySetInnerHTML={{ __html: data.intro.html }} />
        <Awards>
          <AwardHeader>
            <Type4 tag="h1">Awards</Type4>
            <AwardIcon />
          </AwardHeader>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.awards.html }} />
        </Awards>
        <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: data.mission.html }} />
        <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: data.history.html }} />
        <MarkdownBlock
          tag="section"
          dangerouslySetInnerHTML={{ __html: data.certifications.html }}
        />
      </PageContainer>
    );
  }
}

export default styled(About)`
  padding-top: 2rem;
`;

export const query = graphql`
  query AboutPage {
    intro: markdownRemark(id: { regex: "/content/about/intro/" }) {
      html
    }

    mission: markdownRemark(id: { regex: "/content/about/mission/" }) {
      html
    }

    history: markdownRemark(id: { regex: "/content/about/history/" }) {
      html
    }

    certifications: markdownRemark(id: { regex: "/content/about/certifications/" }) {
      html
    }

    awards: markdownRemark(id: { regex: "/content/about/awards/" }) {
      html
    }
  }
`;
