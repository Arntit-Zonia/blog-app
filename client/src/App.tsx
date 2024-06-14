import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./views/About";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Projects from "./views/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const App: FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
