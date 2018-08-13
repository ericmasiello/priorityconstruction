import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

const LayoutContext = React.createContext({
  logo: {},
  title: '',
  isFullHeight: false,
  background: {},
  navRef: null,
  showPortal: false,
  portalElm: null,
  displayPortal: () => {},
  hidePortal: () => {},
});

export const withLayoutContext = Component => {
  class Wrapper extends React.Component {
    static displayName = `withLayoutContext${Component.displayName || Component.name}`;

    static propTypes = {
      innerRef: PropTypes.func,
    };

    render() {
      const { innerRef, ...rest } = this.props;
      return (
        <LayoutContext.Consumer>
          {layoutContext => <Component ref={innerRef} {...rest} {...layoutContext} />}
        </LayoutContext.Consumer>
      );
    }
  }

  hoistNonReactStatics(Wrapper, Component);

  return Wrapper;
};

export default LayoutContext;
