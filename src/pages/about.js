import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import List from '../components/List';
import ContentBlock from '../components/ContentBlock';
import NavBlockList from '../components/NavBlockList';
import { pxToRem } from '../styles/utils';
import { COLORS, PAGE_SPACING } from '../styles/vars';

const StickyNavContainer = styled.div`
  position: fixed;
  top: ${pxToRem(64)};
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: ${COLORS.highlight3};
  transition: transform 0.5s;

  ${({ show }) => (
    show
      ? 'transform: translateY(0);'
      : `transform: translateY(${pxToRem(-200)});`
  )}

  ${NavBlockList} {
    justify-content: flex-end;
  }

  ${NavBlockList.Item}:last-child a {
    padding-right: ${pxToRem(PAGE_SPACING.horizontal)};
  }
`;

const navItems = [{
  href: '#history',
  children: 'Our History',
}, {
  href: '#mission',
  children: 'Our Mission',
}, {
  href: '#certifications',
  children: 'Our Certifications',
}];

const AboutContent = styled.div`
  grid-template-columns: minmax(${pxToRem(200)}, ${pxToRem(300)}) 1fr;
  grid-gap: 3vw;

  @media(min-width: ${pxToRem(750)}) {
    display: grid;
  }

  @media(min-width: ${pxToRem(2000)}) {
    grid-gap: ${pxToRem(60)};
  }

  ${NavBlockList} {
    margin-bottom: ${pxToRem(20)};
  }

  ${ContentBlock}:not(:last-child) {
    margin-bottom: ${pxToRem(70)};
  }
`;

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight + window.pageYOffset) &&
    rect.right <= (window.innerWidth + window.pageXOffset)
  );
}

class About extends React.Component {
  state = { showStickyNav: false };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  leftNavList = React.createRef();

  handleShowSticky = () => this.setState({ showStickyNav: true });
  handleHideSticky = () => this.setState({ showStickyNav: false });

  handleScroll = () => {
    if (!this.leftNavList.current) {
      return;
    }

    if (isInViewport(this.leftNavList.current)) {
      window.requestAnimationFrame(this.handleHideSticky);
    } else {
      window.requestAnimationFrame(this.handleShowSticky);
    }
  };

  render() {
    const { className } = this.props;

    return (
      <section className={className}>
        <StickyNavContainer show={this.state.showStickyNav}>
          <NavBlockList row>
            {navItems.map((item => (
              <NavBlockList.Item key={item.href}>
                <a href={item.href}>{item.children}</a>
              </NavBlockList.Item>
            )))}
          </NavBlockList>
        </StickyNavContainer>

        <AboutContent>

          <div>
            <div ref={this.leftNavList}>
              <NavBlockList>
                {navItems.map((item => (
                  <NavBlockList.Item key={item.href}>
                    <a href={item.href}>{item.children}</a>
                  </NavBlockList.Item>
                )))}
              </NavBlockList>
            </div>
          </div>

          <div>
            <ContentBlock tag="section" id="history">
              <p>
                Priority Construction Corp. was established in 1996 by Pedro Ponce,
                a humble man from humble beginnings. Pedro Ponce envisioned a family
                owned company that focused on building positive bonds and maintaining
                a good reputation within the construction community in Baltimore. What
                started off as a small, family owned construction company working on
                1-2 projects at a time, has transformed into one of the most
                successful minority based subcontractors in the Baltimore
                metropolitan area.
              </p>
              <p>
                For the first couple of years, project bids where being made in the
                basement of his family home in Silver Spring, MD, with a total work
                force of 10 people. As the years passed by and more projects where
                being successfully completed, Priority Construction Corp. started
                to build a reputation of not only finishing the projects on time
                but with a professional craft that speaks for itself.
              </p>
              <p>
                Baltimore Inner Harbor, Towson University, Oriole Park at Camden
                Yards, Jones Falls Trail, University of Maryland College Park,
                Metro Pointe in Wheaton, are just a few projects that have been
                completed by the company and has the parts in Maryland with
                a better view.
              </p>
              <p>
                The driving force behind Priority Construction Corp. success has
                been and will always be the individuals working for the
                company. Whether it&rsquo;s the Finisher or Project Estimator,
                everyone&rsquo;s unique set of skills makes this company always
                strive for success and their ability to solve any challenge
                they receive makes Priority Construction Corp. an industry
                standard when it comes to the concrete and brick paving business.
              </p>
            </ContentBlock>
            <ContentBlock tag="section" id="mission">
              <p>
                At Priority Construction, we strive to exceed our client’s and
                competitor&rsquo;s expectation by maintaining a high level of
                professionalism, integrity, workmanship, work ethic, and
                honesty. We value the importance of our relationships and
                will continue to remain fair and true in our dealings with
                all employees and clients.
              </p>
              <p>
                Our clients count on our dependability and drive. We take price
                in that. We take pride in our accomplishments and build on
                them every day.
              </p>
            </ContentBlock>
            <ContentBlock tag="section" id="certifications">
              <List>
                <List.Item>MBE - STATE # 02-490</List.Item>
                <List.Item>MBE - BALTIMORE CITY # 01-003989</List.Item>
                <List.Item>MDOT # 02-490 - MBE Eligible Letter</List.Item>
                <List.Item>MDOT # 02-490 - Expansion Of Services Letter</List.Item>
                <List.Item>Baltimore County Certificate of Prequalification</List.Item>
              </List>
            </ContentBlock>
          </div>
        </AboutContent>
      </section>
    );
  }
}

About.displayName = 'About';

About.propTypes = {
  className: PropTypes.string,
};

export default styled(About)``;
