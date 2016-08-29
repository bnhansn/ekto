import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { hideAlert } from './actions';
import Alert from '../../components/Alert';

class AlertContainer extends Component {
  componentWillReceiveProps(newProps) {
    const { alert: { visible }, location: { pathname } } = this.props;
    const newPathname = newProps.location.pathname;

    if (visible && pathname !== newPathname) {
      this.props.hideAlert();
    }
  }

  @autobind
  handleClick() {
    this.props.hideAlert();
  }

  render() {
    const { alert: { visible } } = this.props;

    return visible ? <Alert {...this.props} onClick={this.handleClick} /> : null;
  }
}

AlertContainer.propTypes = {
  alert: PropTypes.object.isRequired,
  hideAlert: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    alert: state.alert,
    location: state.app.location,
  }),
  { hideAlert }
)(AlertContainer);
