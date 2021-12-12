import React, { useState, FC } from "react";
import SignInModalC from "./signinModal";

const HeaderC: FC = () => {

  const [displaySignin, setDisplaySignIn] = useState<boolean>(false);
  const [email, ] = useState<string>("");
  const [password, ] = useState<string>("");

  return (
    <header className="navbar-div">

      {/* Signin */}
      <SignInModalC 
        show={displaySignin} 
        onHide={() => setDisplaySignIn(false)}
        email={email}
        password={password}
      />

      <div>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <a className="menu-toggle">
            <h1>menu</h1>
          </a>
        </label>
        <nav className="navbar">
          <a href="/">
            <h1>home</h1>
          </a>
          <a href="/collection/2D">
            <h1>store</h1>
          </a>
          <a href="/about">
            <h1>info</h1>
          </a>
          <a href="/contact">
            <h1>contact</h1>
          </a>
          <div>
            <h1 className="pointer" onClick={() => setDisplaySignIn(true)}>sign in</h1>
          </div>
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default HeaderC;
