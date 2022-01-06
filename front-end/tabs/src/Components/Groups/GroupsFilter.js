import React from "react";

import "./GroupsFilter.css";

const GroupsFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };
  return (
    <div className="groups-filter">
      <div className="groups-filter__control">
        <label>Filter by tag</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {/* value permet de mettre par defaut la valeur */}
          <option value="tags">Tout</option>
          <option value="sport">Sport</option>
          <option value="musique">Musique</option>
          <option value="jeux">Jeux de société</option>
          <option value="parole">Groupe de parole</option>
        </select>
      </div>
    </div>
  );
};

export default GroupsFilter;
