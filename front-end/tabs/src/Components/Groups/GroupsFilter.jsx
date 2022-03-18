import React from "react";
import "./GroupsFilter.css";
import { ReactComponent as SearchIcon } from "../UI/icons/search.svg";

const GroupsFilter = (props) => {
  return (
    <div className="groups-filter">
      <div className="groups-filter__control">
        <label htmlFor="id-input">
          <SearchIcon className="search-icon" />
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
