import React, { FC } from "react";
import { Grid } from '@mui/material';

const AdminProductsMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px"}}>
      <a href="/admin/products/2D">
        <h1>2D prints</h1>
      </a>
      <a href="/admin/products/3D">
        <h1>3D models</h1>
      </a>
      <a href="/admin/products/painting">
        <h1>paintings</h1>
      </a>
      <a href="/admin/products/sculpture">
        <h1>sculptures</h1>
      </a>
      <a href="/admin/products/book">
        <h1>books</h1>
      </a>
      <a href="/admin/products/comic">
        <h1>comics</h1>
      </a>
    </Grid>
  );
};

export default AdminProductsMenuC;
