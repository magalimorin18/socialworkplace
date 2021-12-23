import React from "react";
import "./GroupsList.css";
import GroupItem from "./GroupItem";

const GroupsList = (props) => {
  // let expensesContent = <p>No expenses found</p>

  // if (props.items.length === 0) {
  //     return( <h2 className = 'expenses-list_fallback'>No expenses found</h2>)
  // }

  return (
    <ul className="groups_list">
      {props.items.map((groups) => (
        <GroupItem key={groups.id} title={groups.title} />
      ))}
    </ul>
  );
};

export default GroupsList;
