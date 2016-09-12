import React, { Component, PropTypes } from 'react';

class PagerLink extends Component {
  handleClick = () => {
    if (!this.props.disabled) {
      this.props.onPagerLinkClick(this.props.direction);
    }
  }

  render() {
    const { direction, disabled } = this.props;

    let icon;
    if (direction === 'prev') {
      icon = <span style={{ fontSize: '20px', lineHeight: '1' }}>&lt;</span>;
    } else {
      icon = <span style={{ fontSize: '20px', lineHeight: '1' }}>&gt;</span>;
    }

    return (
      <button
        disabled={disabled}
        style={{ flexGrow: '1' }}
        onClick={this.handleClick}
        className={`btn btn-secondary ${disabled && 'disabled'}`}
      >
        {icon}
      </button>
    );
  }
}

PagerLink.propTypes = {
  disabled: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  onPagerLinkClick: PropTypes.func.isRequired,
};

export default PagerLink;
