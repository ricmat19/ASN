import React, { FC } from "react";
import { Grid } from '@mui/material';

const AdminMediasMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px"}}>
        <a href="/admin/medias/blog">
          <h1>blog</h1>
        </a>
    </Grid>
  );
};

export default AdminMediasMenuC;
