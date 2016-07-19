import React, { Component, PropTypes } from 'react';

class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    triggerClassName: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.clickListener = ::this.handleListenedClick;
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickListener);
  }

  toggleListener() {
    if (this.state.isOpen) {
      window.addEventListener('click', this.clickListener);
    } else {
      window.removeEventListener('click', this.clickListener);
    }
  }

  toggleDropdown() {
    this.setState({
      isOpen: !this.state.isOpen,
    }, () => { this.toggleListener(); });
  }

  handleListenedClick(e) {
    const componentClicked = this.refs.instance.contains(e.target);

    // close for oustide clicks or child <a> clicks
    if (!componentClicked || e.target.nodeName === 'A') {
      this.setState({ isOpen: false });
      window.removeEventListener('click', this.clickListener);
    }
  }

  render() {
    const { isOpen } = this.state;
    const { children, className, triggerClassName } = this.props;

    return (
      <div ref="instance" className={`dropdown ${className}`}>
        <div onClick={::this.toggleDropdown} className={`dropdown-trigger ${triggerClassName}`}>
          {children[0]}
        </div>
        {isOpen && children[1]}
      </div>
    );
  }
}

export default Dropdown;
