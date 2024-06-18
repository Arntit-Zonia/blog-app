import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import UserForm from "../components/UserForm";
import WelcomeMessage from "../components/WelcomeMessage";

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
        <WelcomeMessage messageType="register" />
        <div className="flex-1">
          <UserForm formType="register" onSubmit={handleRegisterSubmit} />
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Have an account?</span>
            <Link to="/user/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
