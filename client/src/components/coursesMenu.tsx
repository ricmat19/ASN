import React, { FC } from "react";

const CoursesMenuC: FC = () => {

  return (
    <div className="center subtitle-div">
        <a className="subtitle-anchor" href="/collection/2D">
          <h1>Drawing</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/2D">
          <h1>Painting</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/3D">
          <h1>Sculpting</h1>
        </a>
        <a className="subtitle-anchor" href="/collection/comic">
          <h1>Writing</h1>
        </a>
    </div>
  );
};

export default CoursesMenuC;
