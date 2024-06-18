import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import UserForm from "../components/UserForm";
import WelcomeMessage from "../components/WelcomeMessage";

import { IUserFormData } from "../interfaces/user";

const Login: FC = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: IUserFormData) => {
    await axios.post("/login", data);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <WelcomeMessage messageType="login" />
        <div className="flex-1">
          <UserForm formType="login" onSubmit={handleLoginSubmit} />
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Don't have an account?</span>
            <Link to="/user/register" className="text-blue-500">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
