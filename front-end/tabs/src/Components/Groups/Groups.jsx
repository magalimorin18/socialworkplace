import "./Groups.css";
import Card from "../UI/Card";
//import GroupsList from "./GroupsList";
import GroupItem from "./GroupItem";

import GroupsFilter from "./GroupsFilter";
import React, { useState } from "react";

// forward the data and then store it in a state

function Groups(props) {
  const [filter, setFilter] = useState("");

  const filterChangeHandler = (event) => {
    setFilter(event.target.value);
  };

  //   const filteredExpenses = props.items.filter((expense) => {
  //     return expense.date.getFullYear().toString() == filteredYear;
  //   }); //Pour filtrer sur la date

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
      })}
    </Card>
  );
}

export default Groups;