import "./Groups.css";
import Card from "../UI/Card";
import GroupsList from "./GroupsList";
import GroupItem from "./GroupItem";

import GroupsFilter from "./GroupsFilter";
import React, { useState, useEffect } from "react";

// forward the data and then store it in a state

function Groups(props) {
  const [filteredYear, setFilteredYear] = useState("tags");
  const [groups, setGroups] = useState([]);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  //   const filteredExpenses = props.items.filter((expense) => {
  //     return expense.date.getFullYear().toString() == filteredYear;
  //   }); //Pour filtrer sur la date

  useEffect(() => {
    console.log("https://localhost:5001/api/Group");
    fetch("https://localhost:5001/api/Group", { method: "GET" }).then((rep) =>
      rep
        .json()
        .then((groups) => {
          setGroups(groups);
          console.log(groups);
        })
        .catch((e) => console.log(e))
    );
  }, []);

  return (
    <li>
      <Card className="groups">
        <GroupsFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {groups.map((group) => (
          <GroupItem key={group.id} title={group.title} />
        ))}
      </Card>
    </li>
  );
}

export default Groups;
