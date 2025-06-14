import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn routing="hash" afterSignOutUrl="/" signUpUrl="/signup" />
    </div>
  );
};
/*
broo oadd these in your env vars 
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/home"
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/home"
*/
export default SignInComponent;
