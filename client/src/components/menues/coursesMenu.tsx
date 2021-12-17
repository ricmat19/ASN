import React, { FC } from "react";
import { Grid } from '@mui/material';

const CoursesMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
        <a href="/courses/drawing">
          <h1>drawing</h1>
        </a>
        <a href="/courses/painting">
          <h1>painting</h1>
        </a>
        <a href="/courses/sculpting">
          <h1>sculpting</h1>
        </a>
        <a href="/courses/writing">
          <h1>writing</h1>
        </a>
    </Grid>
  );
};

export default CoursesMenuC;
