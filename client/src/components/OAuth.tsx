import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

const OAuth = () => {
  const handleOAth = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={() => handleOAth()}>
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;
