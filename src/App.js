import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.js"
import RegisterUser from "./pages/RegisterUser"
import SigninUser from "./pages/SigninUser"
import HomeFeedsPage from "./pages/HomeFeedsPage"
import UserProfile from "./pages/UserProfile"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} exact />
          <Route path="/signup" element={<RegisterUser/>} exact />
          <Route path="/signin" element={<SigninUser/>} exact />
          <Route path="/home" element={<HomeFeedsPage/>} exact />
          <Route path="/profile" element={<UserProfile/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
