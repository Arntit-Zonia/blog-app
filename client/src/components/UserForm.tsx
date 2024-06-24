import { FC, useEffect, useRef } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { loginStart, loginSuccess, loginFailure } from "../redux/slice/user";
import { RootState } from "../redux/store";
import { IUser } from "../interfaces/user";

import OAuth from "./OAuth";

interface IUserFormProps {
  formType: "register" | "login";
  onSubmit: (data: IUser) => Promise<void>;
}

const UserForm: FC<IUserFormProps> = ({ formType, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<IUser>();
  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state: RootState) => state.user);
  const errorAlertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocus(formType === "register" ? "username" : "email");
  }, [formType, setFocus]);

  useEffect(() => {
    if (errorMessage && errorAlertRef.current) {
      errorAlertRef.current.focus();
    }
  }, [errorMessage]);

  const handleFormSubmit: SubmitHandler<IUser> = async (data) => {
    dispatch(loginStart());

    try {
      await onSubmit(data);
      dispatch(loginSuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
        dispatch(loginFailure(error.response?.data?.error || "An error occurred. Please try again."));
      } else {
        console.error(error);
        dispatch(loginFailure("An error occurred. Please try again."));
      }
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
          "Register"
        ) : (
          "Login"
        )}
      </Button>
      {errorMessage && (
        <Alert ref={errorAlertRef} className="mt-5" color="failure" aria-live="assertive" tabIndex={-1}>
          {errorMessage}
        </Alert>
      )}
      <OAuth />
    </form>
  );
};

export default UserForm;
