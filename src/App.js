import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAtom } from "jotai";
import { useQuery } from "@apollo/client";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Logs from "./pages/Logs/Logs";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import CreateLog from "./pages/Logs/CreateLog";
import CreateUser from "./pages/Admin/CreateUser";
import UpdateUser from "./pages/Admin/UpdateUser";

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

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <UserRoute exact path="/logs" component={Logs} />
        <UserRoute exact path="/createlog" component={CreateLog} />
        <AdminRoute exact path="/admin" component={Admin} />
        <AdminRoute exact path="/createuser" component={CreateUser} />
        <AdminRoute exact path="/updateuser" component={UpdateUser} />
      </Switch>
    </Router>
  );
}

export default App;
