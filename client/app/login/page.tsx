import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn routing="hash" afterSignOutUrl="/" signUpUrl="/signup" />
    </div>
  );
};

export default SignInComponent;
