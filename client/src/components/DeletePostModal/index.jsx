import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';

class DeletePostModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false,
    };
  }

  render() {
    const { isDeleting } = this.state;
    const { isOpen, onDelete, onRequestClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        className="modal"
        onRequestClose={onRequestClose}
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h6 className="text-primary">Delete post</h6>
          <i
            className="modal-close"
            onClick={onRequestClose}
          />
        </div>
        <div className="modal-content">
          <p>Are you sure you want to permanently delete this post?</p>
        </div>
        <div className="modal-footer text-xs-right">
          <div className="btn-toolbar">
            <button
              type="button"
              onClick={onRequestClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="btn btn-danger"
            >
              {isDeleting ? 'Deleting...' : 'Delete post'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}


export default DeletePostModal;
