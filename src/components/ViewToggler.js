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
    const currentIndex = this.state.views.findIndex(tab => tab === this.state.selected);
    const nextTab =
      currentIndex >= this.state.views.length - 1
        ? this.state.views[0]
        : this.state.views[currentIndex + 1];

    this.setState({
      selected: nextTab,
    });
  };
  handlePreviousView = () => {
    const currentIndex = this.state.views.findIndex(tab => tab === this.state.selected);
    const nextTab =
      currentIndex === 0
        ? this.state.views[this.state.views.length - 1]
        : this.state.views[currentIndex - 1];

    this.setState({
      selected: nextTab,
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
