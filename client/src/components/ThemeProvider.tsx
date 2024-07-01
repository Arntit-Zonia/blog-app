import { useSelector } from "react-redux";
import { FC, ReactNode } from "react";

import { RootState } from "../redux/store";

interface IThemeProvider {
  children: ReactNode;
}

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">{children}</div>
    </div>
  );
};

export default ThemeProvider;
