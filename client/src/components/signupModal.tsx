import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from 'react-bootstrap';

interface IModalState {
  show: boolean,
  onHide: () => void,
  email: string,
  password: string,
  passwordCopy: string,
  firstName: string,
  lastName: string
}

function SignUpModalC(props: IModalState) {
    const [, setFirstName] = useState<string>("");
    const [, setLastName] = useState<string>("");
    const [, setEmail] = useState<string>("");
    const [, setPassword] = useState<string>("");
    const [, setPasswordCopy] = useState<string>("");
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
            // ref={signupRef} 
            className="sign-content">
                <h1 className="sign-header">Create Account</h1>
                <div className="sign-input">
                <div className="name-input-div">
                    <input
                    type="text"
                    value={props.firstName}
                    name="firstName"
                    placeholder="First Name"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                    />
                    <input
                    type="text"
                    value={props.lastName}
                    name="lastname"
                    placeholder="Last Name"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                    />
                </div>
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
                <div className="modal-input-div">
                    <input
                    type="password"
                    value={props.passwordCopy}
                    name="re-password"
                    placeholder="Re-type Password"
                    onChange={(e) => {
                        setPasswordCopy(e.target.value);
                    }}
                    />
                </div>
                </div>
                <div>
                <button
                    // onClick={handleSignup}
                    type="submit"
                    className="btn form-button"
                >
                    Create Account
                </button>
                </div>
                <div className="sign-footer">
                <div className="modal-link">
                    <span>Already have an account? Sign In</span>
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

SignUpModalC.propTypes = {
  onHide: PropTypes.string,
};

export default SignUpModalC;