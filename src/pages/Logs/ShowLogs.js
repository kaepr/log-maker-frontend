const IndividualLog = ({ data }) => {
  console.log("data in individual ", data);

  return (
    <div className="log--item">
      <div className="log--phonenumber">{data.phoneNumber}</div>
      <div className="log--body">{data.body}</div>
    </div>
  );
};

const ShowLogs = ({ data }) => {
  console.log("data = ", data);

  if (data === null || data === undefined) {
    return <div>No Logs</div>;
  }

  return (
    <div className="log--container">
      {data.map((value, index) => {
        return <IndividualLog data={value} key={value.id} />;
      })}
    </div>
  );
};

export default ShowLogs;
