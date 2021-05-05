import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { user } from "../../store/store";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [userData] = useAtom(user);
  let isAdmin = false;
  if (userData !== null && userData !== undefined) {
    if (userData.role === "ADMIN") {
      isAdmin = true;
    }
  } else {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
