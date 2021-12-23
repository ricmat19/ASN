import React, { FC } from "react";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";

const HelpC: FC = () => {

  return (
    <div>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body item-details"></div>
      <FooterC />
    </div>
  );
};

export default HelpC;