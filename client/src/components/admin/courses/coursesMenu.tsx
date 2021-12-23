import React, { FC } from "react";
import { Grid } from '@mui/material';

const AdminCoursesMenuC: FC = () => {

  return (
    <Grid container sx={{justifyContent: "center", gap: "25px", mt: "10px"}}>
        <a href="/admin/courses/drawing">
          <h1>drawing</h1>
        </a>
        <a href="/admin/courses/painting">
          <h1>painting</h1>
        </a>
        <a href="/admin/courses/sculpting">
          <h1>sculpting</h1>
        </a>
        <a href="/admin/courses/writing">
          <h1>writing</h1>
        </a>
    </Grid>
  );
};

export default AdminCoursesMenuC;
