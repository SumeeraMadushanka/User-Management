import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Start from "./components/Start";
import Home from "./components/Home";
import UserDashbord from "./components/User/UserDashbord";
import Profile from "./components/User/Profile";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import Adminpage from "./components/Adminpage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ForgotPasword from "./components/Register/ForgotPassword";
import ResetPassword from "./components/Register/ResetPassword";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>

          <Route path="/" element={<Start />} />
          <Route path="/home" element={ <Home />} />

          <Route path="/user-dashboard/:name" element={<UserDashbord/>}/>
          <Route path="/user-dashboard/:name/profile/:id" element={<Profile/>}/>

          <Route path="/login" element={[<NavBar />,<Login/>]} /> 
          <Route path="/register" element={[<NavBar />,<Register/>]} />
          <Route path="/forgotpassword" element={[<NavBar />,<ForgotPasword/>]} />
          <Route path="/passwordreset/:resetToken" element={[<NavBar />,<ResetPassword/>]} />

          <Route path="/admin" element={<Adminpage />} />
         
     
      
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
