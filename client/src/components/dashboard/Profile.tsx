import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";

import useLogout from "../../hooks/useLogout";
import { RootState } from "../../redux/store";
import { Button, TextInput } from "flowbite-react";
import { IUser } from "../../interfaces/user";

const Profile: FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const handleLogout = useLogout();

  // TODO: implement handleFormSubmit
  const handleFormSubmit: SubmitHandler<IUser> = (data) => {
    console.log("Form data", data);
  };

  // TODO: implement handleDelete
  const handleDelete = () => {
    console.log("Delete account");
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser?.profilePicture}
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
            alt="user"
          />
        </div>
        <TextInput
          type="text"
          placeholder="Username"
          defaultValue={currentUser?.username}
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        <TextInput
          type="email"
          placeholder="Email"
          defaultValue={currentUser?.email}
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        <TextInput
          type="password"
          placeholder="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        {/* TODO add spinner similar to Login comp */}
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Profile;
