import { SignUp } from "@clerk/clerk-react";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignUp path="/register" routing="path" />
    </div>
  );
};

export default SignupPage;
