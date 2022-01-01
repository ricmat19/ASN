import React, { FC } from "react";
import { ListItemIcon, MenuItem } from "@mui/material";

const EllipseModalC: FC = () => {
  return (
    <div>
      <a href="/about">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-info-circle"></i>
          </ListItemIcon>
          About
        </MenuItem>
      </a>
      <a href="/contact">
        <MenuItem>
          <ListItemIcon>
            <i className="far fa-paper-plane"></i>
          </ListItemIcon>
          Contact
        </MenuItem>
      </a>
      <a href="/help">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-question"></i>
          </ListItemIcon>
          Help
        </MenuItem>
      </a>
      <a href="/termsOfService">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-gavel"></i>
          </ListItemIcon>
          Terms of Service
        </MenuItem>
      </a>
      <a href="/privacyPolicy">
        <MenuItem>
          <ListItemIcon>
            <i className="fas fa-lock"></i>
          </ListItemIcon>
          Privacy Policy
        </MenuItem>
      </a>
    </div>
  );
};

export default EllipseModalC;
