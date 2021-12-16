import React, { FC } from "react";
import { Grid } from '@mui/material';

const MenuHeaderC: FC = () => {

  return (
    <header>
      <nav>
        <Grid container>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-store-alt"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <a href="/collection/2D">
                <h1 className="example-logo">Store</h1>
              </a>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-chalkboard-teacher"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1 className="example-logo">Courses</h1>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-tv"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1 className="example-logo">Media</h1>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-paint-brush"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1 className="example-logo">Projects</h1>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-calendar-check"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1 className="example-logo">Events</h1>
            </Grid>
          </Grid>
          <Grid container xs={2} sx={{justifyContent: "center"}}>
            <Grid sx={{textAlign: 'center', alignSelf: "center", m: "5px"}}>
              <i className="fas fa-comments"></i>
            </Grid>
            <Grid sx={{textAlign: 'center', alignSelf: "center"}}>
              <h1 className="example-logo">Community</h1>
            </Grid>
          </Grid>
        </Grid>
      </nav>
      <hr/>
    </header>
  );
};

export default MenuHeaderC;
