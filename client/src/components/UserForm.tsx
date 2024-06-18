import { FC, useState, useEffect, useRef } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { IUserFormData } from "../interfaces/user";

interface IUserFormProps {
  formType: "register" | "login";
  onSubmit: (data: IUserFormData) => Promise<void>;
}

const UserForm: FC<IUserFormProps> = ({ formType, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IUserFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorAlertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocus(formType === "register" ? "username" : "email");
  }, [formType, setFocus]);

  useEffect(() => {
    if (errorMessage && errorAlertRef.current) {
      errorAlertRef.current.focus();
    }
  }, [errorMessage]);

  const handleFormSubmit: SubmitHandler<IUserFormData> = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await onSubmit(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
      } else {
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
      {formType === "register" && (
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
      )}
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
        ) : formType === "register" ? (
          "Sign Up"
        ) : (
          "Sign In"
        )}
      </Button>
      {errorMessage && (
        <Alert ref={errorAlertRef} className="mt-5" color="failure" aria-live="assertive" tabIndex={-1}>
          {errorMessage}
        </Alert>
      )}
    </form>
  );
};

export default UserForm;
