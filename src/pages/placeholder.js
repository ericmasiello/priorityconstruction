import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContainer from '../components/PageContainer';

const Placeholder = ({ className }) => (
  <PageContainer tag="section" className={className}>
    <p>Coming soon...</p>
  </PageContainer>
);

Placeholder.propTypes = {
  className: PropTypes.string,
};

Placeholder.displayName = 'Placeholder';

export default styled(Placeholder)`
  padding-top: 2rem;
`;
