import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import appleIcon from '../images/apple-touch-icon.png';
import favicon32 from '../images/favicon-32x32.png';
import favicon16 from '../images/favicon-16x16.png';

const Head = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <link rel="apple-touch-icon" sizes="180x180" href={appleIcon} />
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
  </Helmet>
);

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
};

Head.displayName = 'Head';

export default Head;
