import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from 'react-bootstrap';
import SignUpModalC from "./signupModal";
import ResetPasswordModalC from "./resetModal";
import CollectionAPI from "../../apis/collectionAPI";

interface IModalState {
  show: boolean,
  onHide: () => void,
  email: string,
  password: string,
}

function SignInModalC(props: IModalState) {
  const [displayReset, setDisplayReset] = useState<boolean>(false);
  const [displaySignup, setDisplaySignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName] = useState<string>("");
  const [lastName] = useState<string>("");
  const [passwordCopy] = useState<string>("");

  const handleSignin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await CollectionAPI.post("/signin", {
        email: email,
        password: password,
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

       {/* signup */}
       <SignUpModalC 
        show={displaySignup} 
        onHide={() => setDisplaySignup(false)}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        passwordCopy={passwordCopy}
      />

      {/* reset */}
      <ResetPasswordModalC 
        show={displayReset} 
        onHide={() => setDisplayReset(false)}
      />
      
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
                onClick={handleSignin}
                >sign in</button>
              </div>
              <div className="sign-footer">
                <div className="modal-link" onClick={() => setDisplayReset(true)}>
                  <span>forgot password?</span>
                </div>
                <div className="modal-link" onClick={() => setDisplaySignup(true)}>
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
    </div>
  );
}

SignInModalC.propTypes = {
  onHide: PropTypes.string,
};

export default SignInModalC;