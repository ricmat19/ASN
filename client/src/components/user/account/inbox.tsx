import React, { FC } from "react";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";
import FooterC from "../standard/footer";

const InboxC: FC = () => {

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC />
      <div className="main-body item-details"></div>
      <FooterC />
    </div>
  );
};

export default InboxC;
