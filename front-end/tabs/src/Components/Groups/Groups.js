import "./Groups.css";
import Card from "../UI/Card";
import GroupsList from "./GroupsList";
import GroupItem from "./GroupItem";

import GroupsFilter from "./GroupsFilter";
import React, { useState } from "react";

// forward the data and then store it in a state

function Groups(props) {
  const [filteredYear, setFilteredYear] = useState("tags");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  //   const filteredExpenses = props.items.filter((expense) => {
  //     return expense.date.getFullYear().toString() == filteredYear;
  //   }); //Pour filtrer sur la date

  return (
    <li>
      <Card className="groups">
        <GroupsFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {props.items.map((group) => {
          console.log(group);
          return (
            <GroupItem
              id={group.id}
              key={group.id} // truc pour react
              title={group.title}
              onDeleteGroupData={props.onDeleteGroup}
            />
          );
        })}
      </Card>
    </li>
  );
}

export default Groups;
