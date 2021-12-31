import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";

const UserModalC: FC = () => {
  return (
    <div>
      <a href="/profile">
      <MenuItem>
        <ListItemIcon>
          <i className="fas fa-user"></i>
        </ListItemIcon>
        Profile
      </MenuItem>
      </a>
      <MenuItem>
          <ListItemIcon>
            <i className="fas fa-sign-out-alt"></i>
          </ListItemIcon>
          Logout
      </MenuItem>
    </div>
  );
};

export default UserModalC;
