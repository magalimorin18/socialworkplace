import "./Groups.css";
import Card from "../UI/Card";
import GroupItem from "./GroupItem";

import GroupsFilter from "./GroupsFilter";
import React, { useState } from "react";

function Groups(props) {
  const [filter, setFilter] = useState("");

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Card className="groups">
      <GroupsFilter filter={filter} onChangeFilter={filterChangeHandler} />
      {props.items.map((group) => {
        if (group.title.toLowerCase().includes(filter.toLowerCase())) {
          console.log(group);
          return (
            <GroupItem
              id={group.id}
              key={group.id} // id pour react
              title={group.title}
              onDeleteGroupData={props.onDeleteGroup}
              onJoinGroupData={props.onJoinGroup}
            />
          );
        }
        return <></>;
      })}
    </Card>
  );
}

export default Groups;
