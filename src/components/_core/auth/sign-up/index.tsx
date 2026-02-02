"use client";

import React from "react";
import BasicInfo from "./basic-info";
import AccountType from "./account-type";

const SignUpForm = () => {
  const [active, setActive] = React.useState<"acc-type" | "basic-info">(
    "acc-type",
  );
  const [businessType, setBusinessType] = React.useState<
    "fashion-designer" | "cobbler" | null
  >(null);

  return (
    <div className="h-full px-5">
      {active === "acc-type" && (
        <AccountType setActive={setActive} setBusinessType={setBusinessType} />
      )}
      {active === "basic-info" && (
        <BasicInfo
          businessType={businessType}
          // Optional: you could also pass setActive here if you want "Back" to go to account type
        />
      )}
    </div>
  );
};

export default SignUpForm;
