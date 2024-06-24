import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

import axios from "axios";

import { setUserProfile } from "../redux/slice/user";

const OAuth = () => {
  const dispatch = useDispatch();

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

        console.log({ userProfile });

        dispatch(setUserProfile(userProfile.data));
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    },
    onError: () => {
      console.log("Login Failed");
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
