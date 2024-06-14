import { Link } from "react-router-dom";
import { Footer as FlowbiteContainer } from "flowbite-react";

const Footer = () => {
  return (
    <FlowbiteContainer container className="border rounded-none border-teal-500">
      <div className="flex">
        <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white mr-4">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            AZ
          </span>
          Blog
        </Link>
        <div className="justify-center gap-3 sm:mt-2">
          <FlowbiteContainer.LinkGroup>
            <FlowbiteContainer.Link href="https://www.linkedin.com/in/arntit-zonia/" target="_blank">
              Linkedin
            </FlowbiteContainer.Link>
            <FlowbiteContainer.Link href="https://github.com/Arntit-Zonia" target="_blank">
              Github
            </FlowbiteContainer.Link>
          </FlowbiteContainer.LinkGroup>
        </div>
      </div>
    </FlowbiteContainer>
  );
};

export default Footer;
