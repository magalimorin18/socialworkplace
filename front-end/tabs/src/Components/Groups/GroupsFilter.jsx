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

        {/* <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="tags">Tout</option>
          <option value="sport">Sport</option>
          <option value="musique">Musique</option>
          <option value="jeux">Jeux de société</option>
          <option value="parole">Groupe de parole</option>
        </select> */}
      </div>
    </div>
  );
};

export default GroupsFilter;
