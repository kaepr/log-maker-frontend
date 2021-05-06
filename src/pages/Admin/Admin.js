import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import ShowUsers from "./ShowUsers";
import { GET_USERS } from "../../graphql/queries";

const Admin = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  if (error) {
    return (
      <div>
        <h2>{error.message}</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {loading ? (
        <PulseLoader />
      ) : (
        <>
          <h2>Admin</h2>
          <Link to="/createuser" className="form--submit log__create">
            Create User
          </Link>
          {data !== undefined ? (
            <>
              <p>Total Number of users : {data.getUsers.length}</p>
              <ShowUsers data={data.getUsers} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Admin;
