import React, { FC } from "react";
import { Grid } from '@mui/material';

const MediasMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
        <a href="/medias/blog">
          <h1>blog</h1>
        </a>
        <a href="/medias/podcast">
          <h1>podcast</h1>
        </a>
        <a href="/medias/channel">
          <h1>channel</h1>
        </a>
    </Grid>
  );
};

export default MediasMenuC;
