import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAtom } from "jotai";
import { user } from "../../store/store";

const UserRoute = ({ component: Component, ...rest }) => {
  const [userData] = useAtom(user);
  let isLogged = false;
  if (userData !== null && userData !== undefined) {
    isLogged = true;
  } else {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

export default UserRoute;
