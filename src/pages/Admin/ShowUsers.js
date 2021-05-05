const IndividualUser = ({ data }) => {
  return (
    <div className="log--item">
      <div className="log--phonenumber">{data.phoneNumber}</div>
      <div className="log--body">{data.body}</div>
    </div>
  );
};

const ShowUsers = ({ data }) => {
  if (data === null || data === undefined) {
    return <div>No Users</div>;
  }

  console.log("data = ", data);

  return (
    <div className="log--container">
      {data.map((value) => {
        return <IndividualUser data={value} key={value.id} />;
      })}
    </div>
  );
};

export default ShowUsers;
