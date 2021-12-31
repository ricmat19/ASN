import React, { useEffect, FC } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import { Grid } from "@mui/material";

const InboxC: FC = () => {

  useEffect((): void => {
    const fetchData = async () => {
      try {
        console.log("test")
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
      <Grid container className="main-body inbox-container">
        <Grid xs={3} className="inbox-navigation" sx={{padding: "30px"}}>
          <Grid>
            <h1>Inbox</h1>
          </Grid>
          <Grid >
            <input type="text" placeholder="search your inbox" className="search-field" />
          </Grid>
        </Grid>
        <Grid xs={8} className="inbox-content" sx={{padding: "30px"}}></Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default InboxC;
