import { FC, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface IRegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IRegisterFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const errorAlertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocus("username");
  }, []);

  useEffect(() => {
    if (errorMessage && errorAlertRef.current) {
      errorAlertRef.current.focus();
    }
  }, [errorMessage]);

  const handleFormSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await axios.post("/register", data);
      navigate("/user/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setErrorMessage(error.response?.data?.error || "An error occurred during sign up. Please try again.");
      } else {
        console.error(error);
        setErrorMessage("An error occurred during sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                disabled={isLoading}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                disabled={isLoading}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                disabled={isLoading}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span className="">Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert ref={errorAlertRef} className="mt-5" color="failure" aria-live="assertive" tabIndex={-1}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
