import React, { FC, useState } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import { Grid } from "@mui/material";
import { ICollection } from "../../../../interfaces";

const CollectionC: FC = () => {
  const [collections] = useState<ICollection[]>([]);

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <Grid className="main-body">
        <Grid>
          <h1>collection</h1>
        </Grid>
        <Grid sx={{ display: "grid", justifyContent: "center" }}>
          <button>create collection</button>
        </Grid>
        <Grid>{collections}</Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default CollectionC;
