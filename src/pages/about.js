import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import MarkdownBlock from '../components/MarkdownBlock';
import TrophyIcon from '../components/TrophyIcon';
import CertificateIcon from '../components/CertificateIcon';
import Type4 from '../components/Type4';
import HeroHomePageContent from '../components/HeroHomePageContent';
import Hero from '../components/Hero';
import * as CustomPropTypes from '../propTypes';
import { pxToRem, grids } from '../styles/utils';
import { TYPE_SIZE, COLORS, GUTTER_SIZE, MEDIA_QUERIES, GRID_SIZE } from '../styles/vars';

const Intro = styled(MarkdownBlock)`
  font-size: ${pxToRem(TYPE_SIZE.t4[0])};
  line-height: ${TYPE_SIZE.t4[1]};
  margin-bottom: 3rem;

  p:last-of-type {
    margin-bottom: 3rem;
  }

  ul {
    text-align: center;
    @media (min-width: ${pxToRem(750)}) {
      columns: 2;
    }
  }

  @media (min-width: ${pxToRem(900)}) {
    text-align: center;
  }
`;

const Awards = styled.section`
  display: grid;
  align-items: center;
  margin-bottom: 3rem;

  @media (min-width: ${pxToRem(750)}) {
    grid-template-columns: 1fr 3fr;
  }

  ${MarkdownBlock} {
    margin-top: 2rem;
    padding: 2rem;
    background-color: ${COLORS.gray[1]};

    @media (min-width: ${pxToRem(750)}) {
      margin-top: 0;
    }
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

const Mission = styled(({ className, missionHtml }) => (
  <HeroHomePageContent innerClassName={className}>
    <Type4 tag="h1" uppercase weight="bold">
      Our Mission
    </Type4>
    <MarkdownBlock tag="section" dangerouslySetInnerHTML={{ __html: missionHtml }} />
  </HeroHomePageContent>
))`
  text-align: center;
  justify-content: center;
  align-items: center;
  padding-left: ${pxToRem(GUTTER_SIZE * 2)};
  padding-right: ${pxToRem(GUTTER_SIZE * 2)};

  ${Type4} {
    margin-top: 1.25rem;
  }

  ${MarkdownBlock} {
    font-size: ${pxToRem(TYPE_SIZE.t5[0])};
    line-height: ${TYPE_SIZE.t5[1]};
  }
`;

const History = styled.section`
  background-color: ${COLORS.gray[1]};
  padding: ${pxToRem(GUTTER_SIZE)};
  margin-top: 3rem;
  margin-bottom: 3rem;
  max-width: ${pxToRem(grids(10))};

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroL)}) {
    margin-top: 0;

    ${Type4} {
      max-width: calc(25% - ${pxToRem(GUTTER_SIZE * 1.5)});
    }
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroXL)}) {
    ${Type4} {
      max-width: calc(50% - ${pxToRem(GUTTER_SIZE * 1.5)});
    }
  }
`;

const Certs = styled.section`
  margin-bottom: 3rem;

  @media (min-width: ${pxToRem(750)}) {
    display: flex;
  }

  @media (min-width: ${pxToRem(MEDIA_QUERIES.heroXL)}) {
    margin-left: ${pxToRem(GRID_SIZE)};
  }

  ${CertificateIcon} {
    fill: #333e4f;
    width: ${pxToRem(104)};
  }
`;

const CertHGroup = styled.hgroup`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: ${COLORS.gray[1]};
  flex-basis: ${pxToRem(grids(3))};
  margin-bottom: 2rem;

  @media (min-width: ${pxToRem(750)}) {
    margin-right: ${pxToRem(GUTTER_SIZE * 2)};
    margin-bottom: 0;
  }
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
      missionBackground: CustomPropTypes.ImageSharp,
    }),
  };

  render() {
    const { className, data } = this.props;

    return (
      <PageContainer tag="section" className={className}>
        <Intro tag="section" dangerouslySetInnerHTML={{ __html: data.intro.html }} />
        <Awards>
          <AwardHeader>
            <Type4 tag="h1" uppercase weight="bold">
              Awards
            </Type4>
            <AwardIcon />
          </AwardHeader>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.awards.html }} />
        </Awards>

        <Hero
          tag="section"
          selectedImage={data.missionBackground}
          bgImages={[data.missionBackground]}
          isFullHeight
        >
          <Mission missionHtml={data.mission.html} />
        </Hero>
        <History>
          <Type4 tag="h1" uppercase weight="bold">
            Our History
          </Type4>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.history.html }} />
        </History>
        <Certs>
          <CertHGroup>
            <Type4 tag="h1" uppercase weight="bold">
              Certifications &amp; Associations
            </Type4>
            <CertificateIcon />
          </CertHGroup>
          <MarkdownBlock dangerouslySetInnerHTML={{ __html: data.certifications.html }} />
        </Certs>
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

    missionBackground: imageSharp(id: { regex: "/src/images/photos/heroes/PriorityShovel/" }) {
      sizes(maxWidth: 1500) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
