import React, { FC } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import { Grid } from "@mui/material";

const PrivacyPolicyC: FC = () => {

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <Grid>
        <Grid>Privacy Policy</Grid>
        <Grid></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default PrivacyPolicyC;