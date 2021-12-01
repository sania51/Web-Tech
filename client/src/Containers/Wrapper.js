import React, { useContext, useEffect, useRef, useState } from "react";
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
import { UserContext } from "../UserContext";

let userData = JSON.parse(localStorage.getItem("data"));

const Wrapper = () => {
  const [loginStatus, setLoginStatus] = useState(null);

  const [universityInfo, setUniversityInfo] = useState(null);

  const [userInfo, setUserInfo] = useState(null);

  const ENDPOINT = "http://127.0.0.1:8080/";

  const [notifications, setNotifications] = useState(null);

  const [xxx, setX] = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      axios
        .get(`${userData.role}/user/${userData.id}`)
        .then((result) => {
          setLoginStatus(result.data.status);
          setUserInfo(result.data.result.data);
          localStorage.setItem("data", JSON.stringify(result.data.result.data));
          console.log("UserInfo api call", result);

          setX([]);
        })
        .catch((error) => {
          console.log(error);
          setLoginStatus("Failed");
          console.log("Error api call", error);
        });
    } else setLoginStatus("Failed");
    axios
      .get("/notifications")
      .then((result) => {
        console.log("Notifications ", result.data.result.data);
        setNotifications(result.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("university/all")
      .then((response) => {
        const data = response.data;

        if (data.status === "OK") {
          setUniversityInfo(data.result.data.universities);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navigation
          loginStatus={loginStatus}
          notifications={notifications}
          userInfo={userInfo}
        />

        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Home universityInfo={universityInfo} userInfo={userInfo} />
            )}
          />
          <Route path="/notifications" exact component={Notifications} />
          <Route path="/examine/:id" exact render={() => <Examine />} />
          <Route
            path="/profile"
            exact
            render={() => <Profile userInfo={userInfo} />}
          />

          <Route path="/signUp" exact component={SignUp} />
          <Route path="/signIn" exact component={SignIn} />
          <Route
            path="/course/:id"
            render={() => (
              <Course universityInfo={universityInfo} userInfo={userInfo} />
            )}
          />

          <Route
            path="/live-exam/:id"
            exact
            render={() => <LiveExam userInfo={userInfo} />}
          />

          <Route
            path="/exam/:id"
            exact
            render={() => <Exam userInfo={userInfo} />}
          />
          <Route
            path="/previous-exam/:id"
            exact
            render={() => <PreviousExam userInfo={userInfo} />}
          />
          <Route
            path="/upcoming-exam/:id"
            exact
            render={() => <UpcomingExam userInfo={userInfo} />}
          />

          <Route path="*" exact={true} component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Wrapper;
