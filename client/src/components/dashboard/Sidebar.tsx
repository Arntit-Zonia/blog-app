import { FC } from "react";
import { Link } from "react-router-dom";
import { Sidebar as SidebarWrapper } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";

import useQueryParam from "../../hooks/useQueryParam";
import useLogout from "../../hooks/useLogout";

const Sidebar: FC = () => {
  const tab = useQueryParam("tab");

  const handleLogout = useLogout();

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
