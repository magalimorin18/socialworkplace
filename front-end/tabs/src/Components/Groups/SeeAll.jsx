import "./SeeAll.css";
import Groups from "./Groups";
import GroupsFilter from "./GroupsFilter";
import React, { useState } from "react";

function SeeAll(props) {
  const [filter, setFilter] = useState("");

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div className="seeAll">
      <GroupsFilter filter={filter} onChangeFilter={filterChangeHandler} />
      <Groups
        filter={filter}
        refreshPage={props.refreshPage}
        items={props.items}
        myGroups={props.myGroups}
      />
    </div>
  );
}

export default SeeAll;
