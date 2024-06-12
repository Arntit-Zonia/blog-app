import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";

const SignUp: FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const { username, email, password } = formData;

      if (!username || !email || !password) {
        return console.error("Please fill in all fields");
      }

      await axios.post("/signup", {
        username,
        email,
        password,
      });

      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
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
          <p className="text-sm mt-5">You can sign up using your email and password or google account</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
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
