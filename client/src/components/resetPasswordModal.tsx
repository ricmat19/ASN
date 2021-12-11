import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from 'react-bootstrap';

interface IModalState {
  show: boolean,
  onHide: () => void
}

function ResetPasswordModalC(props: IModalState) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">

            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
          <div 
          className="sign-content">
            <h1 className="sign-header">Reset Password</h1>
            <div className="sign-input">
              <div className="forgot-input-div">
                <input type="text" placeholder="Email" />
              </div>
            </div>
            <div>
              <button>Send Reset Link</button>
            </div>
            <div className="sign-footer">
              <div className="modal-link">
                <span>Back to signin in</span>
              </div>
            </div>
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
  );
}

ResetPasswordModalC.propTypes = {
  onHide: PropTypes.string,
};

export default ResetPasswordModalC;