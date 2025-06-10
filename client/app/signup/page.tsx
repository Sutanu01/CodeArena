import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp routing="hash" afterSignOutUrl="/" signInUrl="/login"/>
    </div>
  );
};

export default SignUpComponent;
