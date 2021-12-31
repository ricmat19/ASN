import React, { FC } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import { Grid } from "@mui/material";

const TermsOfServiceC: FC = () => {

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <Grid>
        <Grid>Terms of Service</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default TermsOfServiceC;