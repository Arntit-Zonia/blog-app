import { FC } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar as SidebarWrapper } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";

import axios from "axios";

import { logout } from "../../redux/slice/user";
import { RootState } from "../../redux/store";

import useQueryParam from "../../hooks/useQueryParam";

const Sidebar: FC = () => {
  const dispatch = useDispatch();
  const tab = useQueryParam("tab");
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleLogout = async (): Promise<void> => {
    dispatch(logout());

    await axios.post("/logout", currentUser);
  };

  return (
    <SidebarWrapper className="w-full md:w-56">
      <SidebarWrapper.Items>
        <SidebarWrapper.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <SidebarWrapper.Item active={tab === "profile"} icon={HiUser} label="User" labelColor="dark">
              Profile
            </SidebarWrapper.Item>
          </Link>
          <SidebarWrapper.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleLogout}>
            Logout
          </SidebarWrapper.Item>
        </SidebarWrapper.ItemGroup>
      </SidebarWrapper.Items>
    </SidebarWrapper>
  );
};

export default Sidebar;
