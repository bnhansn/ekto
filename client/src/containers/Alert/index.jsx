import { connect } from 'react-redux';
import { hideAlert } from './actions';
import Alert from '../../components/Alert';
import React, { Component, PropTypes } from 'react';

class AlertContainer extends Component {
  handleClick() {
    this.props.hideAlert();
  }

  render() {
    const { alert: { visible } } = this.props;

    return visible ? <Alert {...this.props} onClick={::this.handleClick} /> : null;
  }
}

AlertContainer.propTypes = {
  alert: PropTypes.object.isRequired,
  hideAlert: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    alert: state.alert,
  }),
  { hideAlert }
)(AlertContainer);
