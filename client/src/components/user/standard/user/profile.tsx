import React, { FC, useEffect, useState } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import IndexAPI from "../../../../apis/indexAPI";
import { IUser } from "../../../../interfaces";
import { Grid } from "@mui/material";

const ProfileC: FC = () => {

  const [, setUser] = useState<IUser[]>([]);

  useEffect((): void => {
    const fetchData = async () => {
      try {

        const userResponse = await IndexAPI.get(`/profile`);
        setUser(userResponse.data.data.user);

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
      <Grid className="main-body">
        <Grid className="banner">
          <Grid>
            <img src=""/>
          </Grid>
          <Grid>
            {/* <h1>{user.firstName} {user.lastName}</h1> */}
          </Grid>
          <Grid>
            {/* <h1>{user.city}, {user.state}</h1> */}
          </Grid>
        </Grid>
        <Grid>
          <Grid>
            <h1>Interests</h1>
            {/* <Grid>{user.interests}</Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default ProfileC;
