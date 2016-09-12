import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hideAlert } from './actions';
import Alert from '../../components/Alert';

class AlertContainer extends Component {
  componentWillReceiveProps(newProps) {
    const { visible, location: { pathname } } = this.props;
    const newPathname = newProps.location.pathname;

    if (visible && pathname !== newPathname) {
      this.props.hideAlert();
    }
  }

  handleClick = () => this.props.hideAlert();

  render() {
    const { visible } = this.props;

    return visible ? <Alert {...this.props} onClick={this.handleClick} /> : null;
  }
}

AlertContainer.propTypes = {
  icon: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  klass: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hideAlert: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    icon: state.alert.icon,
    klass: state.alert.klass,
    message: state.alert.message,
    visible: state.alert.visible,
    location: state.app.location,
  }),
  { hideAlert }
)(AlertContainer);
