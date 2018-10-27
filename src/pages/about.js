import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Small from '../components/Small';
import PageContainer from '../components/PageContainer';
import ContentBlock from '../components/ContentBlock';
import NavBlockList from '../components/NavBlockList';
import NavBlockListItem from '../components/NavBlockListItem';
import { pxToRem } from '../styles/utils';
import { COLORS, GUTTER_SIZE, MAX_CONTENT_WIDTH } from '../styles/vars';
import { withLayoutContext } from '../layoutContext';
import { hasScrolledPastBottomOfElement } from '../utils/ui';
import * as CustomPropTypes from '../propTypes';

const StickyNavContainer = styled.div`
  display: none;
  position: fixed;
  margin: auto;
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: ${COLORS.highlight3};
  transition: transform 0.5s;
  padding-left: ${pxToRem(GUTTER_SIZE)};
  padding-right: ${pxToRem(GUTTER_SIZE)};

  @media (min-width: ${pxToRem(375)}) {
    display: block;
  }

  ${({ show }) => (show ? 'transform: translateY(0)' : `transform: translateY(${pxToRem(-200)})`)};

  ${({ offset }) => `top: ${pxToRem(offset)}`};

  ${NavBlockList} {
    max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
    justify-content: flex-end;
    margin: auto;
  }

  ${NavBlockListItem}:last-child a {
    padding-right: 0;
  }
`;

const navItems = [
  {
    href: '#intro',
    children: 'Priority Construction',
  },
  {
    href: '#history',
    children: 'History',
  },
  {
    href: '#mission',
    children: 'Mission',
  },
  {
    href: '#certifications',
    children: 'Certifications',
  },
  {
    href: '#awards',
    children: 'Awards',
  },
];

const AboutContent = styled.div`
  grid-template-columns: minmax(${pxToRem(200)}, ${pxToRem(300)}) 1fr;
  grid-gap: 3vw;

  @media (min-width: ${pxToRem(750)}) {
    display: grid;
  }

  @media (min-width: ${pxToRem(2000)}) {
    grid-gap: ${pxToRem(60)};
  }

  ${NavBlockList} {
    margin-bottom: ${pxToRem(20)};
  }

  ${ContentBlock} {
    &:not(:last-child) {
      margin-bottom: ${pxToRem(70)};
    }
  }
`;

class About extends React.Component {
  state = { showStickyNav: false };

  leftNavList = React.createRef();

  stuckNavList = React.createRef();

  pageNav = null;

  stuckNavElm = null;

  componentDidMount() {
    window.addEventListener('scroll', this.handleSetStickyState, false);
    window.addEventListener('resize', this.handleSetStickyState, false);
  }

  componentDidUpdate() {
    if (!this.pageNav) {
      // eslint-disable-next-line react/no-find-dom-node
      this.pageNav = ReactDOM.findDOMNode(this.props.navRef.current);
    }

    if (!this.stuckNavElm) {
      // eslint-disable-next-line react/no-find-dom-node
      this.stuckNavElm = ReactDOM.findDOMNode(this.stuckNavList.current);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleSetStickyState, false);
    window.removeEventListener('resize', this.handleSetStickyState, false);
  }

  handleShowSticky = () => this.setState({ showStickyNav: true });

  handleHideSticky = () => this.setState({ showStickyNav: false });

  handleSetStickyState = () => {
    if (!this.leftNavList.current) {
      return;
    }

    if (hasScrolledPastBottomOfElement(this.leftNavList.current)) {
      window.requestAnimationFrame(this.handleShowSticky);
    } else {
      window.requestAnimationFrame(this.handleHideSticky);
    }
  };

  handleClick = event => {
    const url = new URL(event.target.href);
    const elm = document.querySelector(url.hash);
    if (elm) {
      elm.focus();
    }
  };

  handleCompueteOffset = () => {
    const pageNavHeight = this.pageNav ? this.pageNav.clientHeight : 0;
    const stuckNavElmHeight = this.stuckNavElm ? this.stuckNavElm.clientHeight : 0;
    return pageNavHeight + stuckNavElmHeight;
  };

  render() {
    const { className, data } = this.props;

    return (
      <PageContainer tag="section" className={className}>
        <StickyNavContainer
          ref={this.stuckNavList}
          show={this.state.showStickyNav}
          offset={this.pageNav ? this.pageNav.clientHeight - 1 : 0}
        >
          <NavBlockList row>
            {navItems.map(item => (
              <NavBlockListItem key={item.href}>
                <Small
                  tag={AnchorLink}
                  href={item.href}
                  offset={this.handleCompueteOffset}
                  onMouseUp={this.handleClick}
                >
                  {item.children}
                </Small>
              </NavBlockListItem>
            ))}
          </NavBlockList>
        </StickyNavContainer>

        <AboutContent>
          <div>
            <div ref={this.leftNavList}>
              <NavBlockList>
                {navItems.map(item => (
                  <NavBlockListItem key={item.href}>
                    <AnchorLink
                      href={item.href}
                      offset={this.handleCompueteOffset}
                      onMouseUp={this.handleClick}
                    >
                      {item.children}
                    </AnchorLink>
                  </NavBlockListItem>
                ))}
              </NavBlockList>
            </div>
          </div>

          <div>
            <ContentBlock
              tag="section"
              id="intro"
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: data.intro.html }}
            />
            <ContentBlock
              tag="section"
              id="history"
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: data.history.html }}
            />
            <ContentBlock
              tag="section"
              id="mission"
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: data.mission.html }}
            />
            <ContentBlock
              tag="section"
              id="certifications"
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: data.certifications.html }}
            />
            <ContentBlock
              tag="section"
              id="awards"
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: data.awards.html }}
            />
          </div>
        </AboutContent>
      </PageContainer>
    );
  }
}

About.displayName = 'About';

About.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    mission: CustomPropTypes.Markdown,
    history: CustomPropTypes.Markdown,
    certifications: CustomPropTypes.Markdown,
    intro: CustomPropTypes.Markdown,
    awards: CustomPropTypes.Markdown,
  }),
  navRef: PropTypes.shape({
    current: PropTypes.shape({}),
  }),
};

export default styled(withLayoutContext(About))`
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
