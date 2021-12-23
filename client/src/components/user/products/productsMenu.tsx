import React, { FC } from "react";
import { Grid } from '@mui/material';

const ProductsMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
      <a href="/products/2D">
        <h1>2D prints</h1>
      </a>
      <a href="/products/3D">
        <h1>3D models</h1>
      </a>
      <a href="/products/paintings">
        <h1>paintings</h1>
      </a>
      <a href="/products/sculptures">
        <h1>sculptures</h1>
      </a>
      <a href="/products/books">
        <h1>books</h1>
      </a>
      <a href="/products/comics">
        <h1>comics</h1>
      </a>
    </Grid>
  );
};

export default ProductsMenuC;
