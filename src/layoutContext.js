import React from 'react';

const LayoutContext = React.createContext({
  logo: {},
  title: '',
  isFullHeight: false,
  background: {},
});

export default LayoutContext;
