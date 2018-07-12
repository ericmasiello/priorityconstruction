import React from 'react';

const LayoutContext = React.createContext({
  logo: {},
  title: '',
  isFullHeight: false,
});

export default LayoutContext;
