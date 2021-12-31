import React, { FC } from "react";
import { Grid } from '@mui/material';

const AdminMenuNavC: FC = () => {

  return (
    <header>
      <nav>
        <Grid container sx={{pt: "5px", pb: "5px", justifyContent: "center"}}>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-store-alt"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/products/2D">
                <h1 className="pointer">store</h1>
              </a>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-chalkboard-teacher"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/courses/drawing">
                <h1 className="pointer">courses</h1>
              </a>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-tv"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/medias/blog">
                <h1 className="pointer">media</h1>
              </a>
            </Grid>
          </Grid>
          {/* <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-paint-brush"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/projects">
                <h1 className="pointer">projects</h1>
              </a>
            </Grid>
          </Grid> */}
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-calendar-check"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/events">
                <h1 className="pointer">events</h1>
              </a>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-comments"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/admin/threads">
                <h1 className="pointer">community</h1>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </nav>
      <hr/>
    </header>
  );
};

export default AdminMenuNavC;
