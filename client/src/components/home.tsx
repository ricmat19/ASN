import React, {FC} from "react";
import {Navigate} from "react-router-dom";

const HomeC: FC = () => {

  return (
    <Navigate to="/products/2D"/>
  );
};

export default HomeC;
