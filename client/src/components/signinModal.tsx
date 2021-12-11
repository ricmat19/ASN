import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from 'react-bootstrap';

interface IModalState {
  show: boolean,
  onHide: () => void,
  email: string,
  password: string,
}

function SignInModalC(props: IModalState) {
  const [, setEmail] = useState<string>("");
  const [, setPassword] = useState<string>("");
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
          // ref={signinRef} 
          className="sign-content">
            <h1 className="sign-header">welcome</h1>
            <div>
              <div className="modal-input-div">
                <input
                  type="email"
                  value={props.email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="modal-input-div">
                <input
                  type="password"
                  value={props.password}
                  name="password"
                  placeholder="Create Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <button 
              // onClick={handleSignin}
              >sign in</button>
            </div>
            <div className="sign-footer">
              <div className="modal-link">
                <span>forgot password?</span>
              </div>
              <div className="modal-link">
                <span>create account</span>
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

SignInModalC.propTypes = {
  onHide: PropTypes.string,
};

export default SignInModalC;