import React from "react";
import "./GroupsFilter.css";

const GroupsFilter = (props) => {
  return (
    <div className="groups-filter">
      <div className="groups-filter__control">
        <label for="id-input">
          <img className="search-icon" src="loupe.png" alt="search item" />
        </label>
        <input
          id="id-input"
          className="filter_input"
          type="text"
          placeholder="Search for a group"
          value={props.filter}
          onChange={props.onChangeFilter}
        />
      </div>
    </div>
  );
};

export default GroupsFilter;
