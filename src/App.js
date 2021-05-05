import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "@apollo/client";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Logs from "./pages/Logs/Logs";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";

import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";

import { user } from "./store/store";
import { GET_CURRENT_USER } from "./graphql/queries";

import "./App.css";

function App() {
  const [, setUser] = useAtom(user);

  const { data, loading, error } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setUser(data.getCurrentUser);
    }
  }, [data]);

  // console.log("data = ", data);
  // console.log("userData = ", userData);
  // console.log("loading = ", loading);
  // console.log("error = ", error);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <UserRoute exact path="/logs" component={Logs} />
        <AdminRoute exact path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
