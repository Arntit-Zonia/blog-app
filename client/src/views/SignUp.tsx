import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

import axios from "axios";

const SignUp: FC = () => {
  const handleFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const formElement = e.currentTarget as HTMLFormElement;

      const formData = new FormData(formElement);

      const username = formData.get("Username") as string;
      const email = formData.get("Email") as string;
      const password = formData.get("Password") as string;

      if (!username || !email || !password) return console.error("Please fill in all fields");

      await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });

      formElement.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:texxt-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              AZ
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">You can sign up using your email and password or google account</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="Username" name="Username" />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="text" placeholder="Email" name="Email" />
            </div>
            <div>
              <Label value="Password" />
              <TextInput type="text" placeholder="Password" name="Password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
