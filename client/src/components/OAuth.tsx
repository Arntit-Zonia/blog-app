import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

import axios from "axios";

import { loginFailure, loginSuccess } from "../redux/slice/user";

const OAuth: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOAth = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        console.log(res);

        const accessToken = res.access_token;

        const userProfile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!userProfile) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = {
          username: userProfile.data.name,
          email: userProfile.data.email,
          tokens: [{ token: accessToken }],
          currentToken: accessToken,
          profilePicture: userProfile.data.picture,
        };

        await axios.post("/oath/google", userData);

        console.log({ userData });

        dispatch(loginSuccess(userData));

        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error);

          dispatch(loginFailure(error.response?.data || "An error occurred. Please try again."));
        } else {
          console.error(error);

          dispatch(loginFailure("Error fetching profile information"));
        }
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  return (
    <>
      <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={() => handleOAth()}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
    </>
  );
};

export default OAuth;
