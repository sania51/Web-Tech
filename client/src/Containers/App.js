import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";
import Navigation from "../Components/Navbar/Navbar";
import SignIn from "../Components/Authentication/SignIn";
import SignUp from "../Components/Authentication/SignUp";
import Home from "../Components/Home/Home";
import Profile from "../Components/Profile/Profile";
import axios from "axios";
import Layout from "../Components/Layout/Layout";
import Course from "../Components/Course/Course";
import Exam from "../Components/Exam/Exam";
import LiveExam from "../Components/LiveExam/LiveExam";
import PreviousExam from "../Components/PreviousExam/PreviousExam";
import UpcomingExam from "../Components/UpcomingExam/UpcomingExam";
import Examine from "../Components/PreviousExam/Examine";
import Error404 from "../Components/404/Error404";
import Notifications from "../Components/Notifications/Notification";
import "./App.css";
import UserStore from "../UserContext";
import Wrapper from "./Wrapper";

function App() {
  return (
    <UserStore>
      <Wrapper />
    </UserStore>
  );
}

export default App;
