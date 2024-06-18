import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserForm from "../components/UserForm";

import { IUserFormData } from "../interfaces/user";

const Register: FC = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data: IUserFormData) => {
    await axios.post("/register", data);
    navigate("/user/login");
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* TODO: Create owner blog component and find a better name for it */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              AZ
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">You can sign up using your email and password or google account</p>
        </div>
        <div className="flex-1">
          <UserForm formType="register" onSubmit={handleRegisterSubmit} />
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Have an account?</span>
            <Link to="/login" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
