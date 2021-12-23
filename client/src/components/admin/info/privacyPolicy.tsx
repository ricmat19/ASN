import React, { FC } from "react";
import AdminAccountNavC from "../standard/accountNav";
import AdminMenuNavC from "../standard/menuNav";
import FooterC from "../../user/standard/footer";

const PrivacyPolicyC: FC = () => {

  return (
    <div>
      <AdminAccountNavC />
      <AdminMenuNavC />
      <div className="main-body item-details"></div>
      <FooterC />
    </div>
  );
};

export default PrivacyPolicyC;