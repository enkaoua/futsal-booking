import React from "react";

const PrintDateNames = (props) => {
  const { data } = props;
  return (
    <div className="container">
      {Object.entries(data).map(([key, value]) => (
        <ol className="week" key={key}>
          <h2>{key}: </h2>
          {value.map((date) => (
            <li>{date}</li>
          ))}
        </ol>
      ))}
    </div>
  );
};

export default PrintDateNames;
