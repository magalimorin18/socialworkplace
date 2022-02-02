import React from "react";

import "./GroupsFilter.css";

const GroupsFilter = (props) => {
  return (
    <div className="groups-filter">
      <div className="groups-filter__control">
        <label>Filter</label>
        <input
          className="filter_input"
          type="text"
          placeholder="Search by name of groups"
          value={props.filter}
          onChange={props.onChangeFilter}
        />
      </div>
    </div>
  );
};

export default GroupsFilter;
