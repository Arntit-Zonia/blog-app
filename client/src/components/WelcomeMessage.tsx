import { FC } from "react";
import { Link } from "react-router-dom";

interface IWelcomeMessageProps {
  messageType: "login" | "register";
}

const WelcomeMessage: FC<IWelcomeMessageProps> = ({ messageType }) => (
  <div className="flex-1">
    <Link to="/" className="font-bold dark:text-white text-4xl">
      <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
        AZ
      </span>
      Blog
    </Link>
    <p className="text-sm mt-5">You can {messageType} using your email and password or google account</p>
  </div>
);

export default WelcomeMessage;
