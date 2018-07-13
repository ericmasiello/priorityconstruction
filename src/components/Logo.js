import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import * as CustomPropTypes from '../propTypes';

const LogoLink = styled(Link)`
  display: inline-block;
  height: 45px;
  width: 197px;
`;

const Logo = props => {
  const { tag: Tag, image, ...rest } = props;
  return (
    <LogoLink to="/">
      <Tag {...rest} />
    </LogoLink>
  );
};

Logo.propTypes = {
  tag: CustomPropTypes.Tag,
  image: CustomPropTypes.ImageSharp.isRequired,
};

Logo.defaultProps = {
  tag: 'h1',
};

export default styled(Logo)`
  ${props => `background-image: url('${props.image.sizes.src}')`};
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-size: contain;
  text-indent: -9999px;
  overflow: hidden;
  margin: 0;
`;
