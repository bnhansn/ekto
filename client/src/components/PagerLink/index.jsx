import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

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
      icon = <i className="icon icon-arrow-left2" />;
    } else {
      icon = <i className="icon icon-arrow-right2" />;
    }

    const classes = classnames({
      disabled,
      btn: true,
      'btn-secondary': true,
    });

    return (
      <button
        disabled={disabled}
        className={classes}
        style={{ flexGrow: '1' }}
        onClick={this.handleClick}
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
