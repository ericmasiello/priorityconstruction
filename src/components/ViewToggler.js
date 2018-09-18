import React from 'react';
import PropTypes from 'prop-types';

const TogglerContext = React.createContext();

export const View = props => (
  <TogglerContext.Consumer>
    {({ selected }) => (selected === props.view ? props.children : null)}
  </TogglerContext.Consumer>
);

View.displayName = 'Toggler.View';
View.propTypes = {
  view: PropTypes.string.isRequired,
  children: PropTypes.node,
};

/* eslint-disable react/no-unused-state, react/sort-comp */
export default class Toggler extends React.Component {
  static displayName = 'Toggler';

  static propTypes = {
    children: PropTypes.node,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    initialSelection: PropTypes.string,
  };

  static Consumer = TogglerContext.Consumer;

  static View = View;

  handleSelection = tab => this.setState({ selected: tab });

  handleNextView = () => {
    this.setState(prevState => {
      const currentIndex = prevState.views.findIndex(tab => tab === prevState.selected);
      const nextTab =
        currentIndex >= prevState.views.length - 1
          ? prevState.views[0]
          : prevState.views[currentIndex + 1];
      return {
        selected: nextTab,
      };
    });
  };

  handlePreviousView = () => {
    this.setState(prevState => {
      const currentIndex = prevState.views.findIndex(tab => tab === prevState.selected);
      const nextTab =
        currentIndex === 0
          ? prevState.views[prevState.views.length - 1]
          : prevState.views[currentIndex - 1];
      return {
        selected: nextTab,
      };
    });
  };

  state = {
    views: this.props.views,
    selected: this.props.initialSelection,
    changeSelected: this.handleSelection,
    goToNextView: this.handleNextView,
    goToPreviousView: this.handlePreviousView,
  };

  render() {
    return (
      <TogglerContext.Provider value={this.state}>{this.props.children}</TogglerContext.Provider>
    );
  }
}
