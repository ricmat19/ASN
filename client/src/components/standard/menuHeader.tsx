import React, { FC } from "react";

const MenuHeaderC: FC = () => {

  return (
    <header className="navbar-div">

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
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default MenuHeaderC;
