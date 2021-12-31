import React, { FC } from "react";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";

const ProfileC: FC = () => {

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <div className="main-body item-details"></div>
      <FooterC />
    </div>
  );
};

export default ProfileC;
