import React, { FC } from "react";
import { Grid } from '@mui/material';

const AdminMediasMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
        <a href="/admin/medias/blog">
          <h1>blog</h1>
        </a>
        <a href="/admin/medias/podcast">
          <h1>podcast</h1>
        </a>
        <a href="/admin/medias/channel">
          <h1>channel</h1>
        </a>
    </Grid>
  );
};

export default AdminMediasMenuC;
