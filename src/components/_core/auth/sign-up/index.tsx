"use client";
import React from "react";
import AccountType from "./account-type";
import BasicInfo from "./basic-info";

const SignUpForm = () => {
  const [active, setActive] = React.useState<"acc-type" | "basic-info">(
    "acc-type",
  );
  return (
    <div className="h-full px-5">
      {active === "acc-type" && <AccountType setActive={setActive} />}
      {active === "basic-info" && <BasicInfo />}
    </div>
  );
};

export default SignUpForm;
