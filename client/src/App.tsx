import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./views/About";
import Register from "./views/Register";
import Login from "./views/Login";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Projects from "./views/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

export const App: FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
