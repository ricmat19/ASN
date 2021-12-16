import React, { FC } from "react";

const StoreMenuC: FC = () => {

  return (
    <div className="center subtitle-div">
        <a className="subtitle-anchor" href="/collection/2D">
          <h1>2D prints</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/3D">
          <h1>3D models</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/paint">
          <h1>paintings</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/sculpt">
          <h1>sculptures</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/book">
          <h1>books</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/comic">
          <h1>comics</h1>
        </a>
    </div>
  );
};

export default StoreMenuC;
