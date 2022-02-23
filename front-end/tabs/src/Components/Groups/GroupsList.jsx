import React from "react";
import "./GroupsList.css";
import GroupItem from "./GroupItem";

const GroupsList = (props) => {
  return (
    <ul className="groups_list">
      {props.items.map((groups) => (
        <GroupItem key={groups.id} title={groups.title} />
      ))}
    </ul>
  );
};

export default GroupsList;
