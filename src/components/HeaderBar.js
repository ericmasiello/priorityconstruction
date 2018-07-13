import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { pxToRem } from '../styles/utils';
import { COLORS, MAX_CONTENT_WIDTH, PAGE_SPACING } from '../styles/vars';
import * as CustomPropTypes from '../propTypes';

const HeaderBarContent = styled.div`
  margin: 0 auto;
  max-width: ${pxToRem(MAX_CONTENT_WIDTH)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

class HeaderBar extends React.Component {
  state = { stuck: false };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleScroll = () => {
    if (window.pageYOffset > 0 && this.state.stuck === false) {
      this.setState({ stuck: true });
    } else if (window.pageYOffset === 0 && this.state.stuck === true) {
      this.setState({ stuck: false });
    }
  }

  render() {
    const { tag: Tag, children, ...rest } = this.props;
    return (
      <Tag {...rest} data-stuck={this.state.stuck}>
        <HeaderBarContent>
          {children}
        </HeaderBarContent>
      </Tag>
    );
  }
}

HeaderBar.displayName = 'HeaderBar';

HeaderBar.propTypes = {
  tag: CustomPropTypes.Tag,
  children: PropTypes.node,
};

HeaderBar.defaultProps = {
  tag: 'header',
};

export default styled(HeaderBar)`
  background-color: ${COLORS.bg};
  padding: ${pxToRem(20)} ${pxToRem(PAGE_SPACING.horizontal)};
  position: sticky;
  top: 0;
  z-index: 10;
  transition: padding 0.2s;

  &[data-stuck="true"] {
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    padding-top: ${pxToRem(10)};
    padding-bottom: ${pxToRem(10)};
  }
`;
