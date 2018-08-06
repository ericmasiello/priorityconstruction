import React from 'react';
import PropTypes from 'prop-types';

const TabContext = React.createContext();

export const Content = props => (
  <TabContext.Consumer>
    {({ activeTab }) => (activeTab === props.name ? props.children : null)}
  </TabContext.Consumer>
);

Content.displayName = 'Tabs.Content';
Content.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

/* eslint-disable react/no-unused-state, react/sort-comp */
export default class Tabs extends React.Component {
  static displayName = 'Tabs';
  static propTypes = {
    children: PropTypes.node,
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string,
  };

  static Consumer = TabContext.Consumer;
  static Content = Content;

  handleSetTab = tab => this.setState({ activeTab: tab });
  handleNextTab = () => {
    const currentIndex = this.state.tabs.findIndex(tab => tab === this.state.activeTab);
    const nextTab =
      currentIndex >= this.state.tabs.length - 1
        ? this.state.tabs[0]
        : this.state.tabs[currentIndex + 1];

    this.setState({
      activeTab: nextTab,
    });
  };
  handlePreviousTab = () => {
    const currentIndex = this.state.tabs.findIndex(tab => tab === this.state.activeTab);
    const nextTab =
      currentIndex === 0
        ? this.state.tabs[this.state.tabs.length - 1]
        : this.state.tabs[currentIndex - 1];

    this.setState({
      activeTab: nextTab,
    });
  };

  state = {
    tabs: this.props.tabs,
    activeTab: this.props.activeTab || this.props.tabs[0],
    changeActiveTab: this.handleSetTab,
    setNextTab: this.handleNextTab,
    setPreviousTab: this.handlePreviousTab,
  };

  render() {
    return <TabContext.Provider value={this.state}>{this.props.children}</TabContext.Provider>;
  }
}
