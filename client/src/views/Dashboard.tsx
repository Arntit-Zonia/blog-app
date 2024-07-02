import { FC } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Profile from "../components/dashboard/Profile";
import useQueryParam from "../hooks/useQueryParam";

const Dashboard: FC = () => {
  const tab = useQueryParam("tab");

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <Sidebar />
      </div>
      {tab === "profile" && <Profile />}
    </div>
  );
};

export default Dashboard;
