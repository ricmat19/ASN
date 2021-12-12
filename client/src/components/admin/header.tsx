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
          <a href="/admin/home">
            <h1>home</h1>
          </a>
          <a href="/admin/collection/2D">
            <h1>store</h1>
          </a>
          <a href="/admin/about">
            <h1>info</h1>
          </a>
          <div onClick={() => setDisplaySignIn(true)}>
            <h1 className="pointer">sign in</h1>
          </div>
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default HeaderC;
