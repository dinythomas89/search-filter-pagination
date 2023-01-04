import React from "react";

const RenderCountries = ({ item }) => {
  return (
    <article className="card">
      <div className="card-image">
        <img src={item.flag.large} alt={item.name} />
      </div>
      <div className="card-content">
        <h2 className="card-name">{item.name}</h2>
      </div>
    </article>
  );
};

export default RenderCountries;
