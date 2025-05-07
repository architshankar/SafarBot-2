import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <SignIn path="/login" routing="path" />
    </div>
  );
};

export default LoginPage;
