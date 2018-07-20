import React from 'react';
import PropTypes from 'prop-types';

const LayoutContext = React.createContext({
  logo: {},
  title: '',
  isFullHeight: false,
  background: {},
  navRef: null,
});

export const withLayoutContext = Component => {
  const Wrapper = ({ innerRef, ...rest }) => (
    <LayoutContext.Consumer>
      {layoutContext => <Component ref={innerRef} {...rest} {...layoutContext} />}
    </LayoutContext.Consumer>
  );

  Wrapper.propTypes = {
    innerRef: PropTypes.func,
  };

  Wrapper.displayName = `withLayoutContext${Component.displayName || Component.name}`;

  // TODO: hoist statics
  return Wrapper;
};

export default LayoutContext;
