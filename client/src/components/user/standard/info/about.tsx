import React, { FC, useEffect } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import { Grid } from "@mui/material";

const AboutC: FC = () => {
  useEffect((): void => {
    const fetchData = async () => {
      try {
        console.log("")
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <Grid>
        <Grid>About</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default AboutC;
