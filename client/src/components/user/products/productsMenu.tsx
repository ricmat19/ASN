import React, { FC } from "react";
import { Grid } from '@mui/material';

const ProductsMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
      <a href="/products/print">
        <h1>2D prints</h1>
      </a>
      <a href="/products/model">
        <h1>3D models</h1>
      </a>
      <a href="/products/painting">
        <h1>paintings</h1>
      </a>
      <a href="/products/sculpture">
        <h1>sculptures</h1>
      </a>
      <a href="/products/book">
        <h1>books</h1>
      </a>
      <a href="/products/comic">
        <h1>comics</h1>
      </a>
    </Grid>
  );
};

export default ProductsMenuC;
