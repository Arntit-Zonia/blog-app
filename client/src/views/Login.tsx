import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import UserForm from "../components/UserForm";

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
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              AZ
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">Sign in using your email and password</p>
        </div>
        <div className="flex-1">
          <UserForm formType="login" onSubmit={handleLoginSubmit} />
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Don't have an account?</span>
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
