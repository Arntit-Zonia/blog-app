import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";

import axios from "axios";

import { RootState } from "../redux/store";
import { logout } from "../redux/slice/user";

const useLogout = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleLogout = async (): Promise<void> => {
    if (currentUser?.isOAuth) {
      console.log("Logging out from Google...");

      await googleLogout();
    }

    dispatch(logout());

    await axios.post("/logout", currentUser, { withCredentials: true });
  };

  return handleLogout;
};

export default useLogout;
