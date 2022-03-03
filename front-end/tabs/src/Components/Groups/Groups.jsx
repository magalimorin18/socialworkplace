import "./Groups.css";
import GroupItem from "./GroupItem";
import React from "react";

function Groups(props) {
  return (
    <div className="groups">
      {props.items
        .filter((group) =>
          group.title.toLowerCase().includes(props.filter.toLowerCase())
        )
        .map((group) => (
          <GroupItem
            id={group.id}
            key={group.id} // id for react
            title={group.title}
            refreshPage={props.refreshPage}
            isInGroup={props.myGroups.some((element) => {
              return element.id === group.id;
            })}
          />
        ))
        .sort((a, b) => {
          if (a.props.isInGroup === b.props.isInGroup) {
            const x = a.props.title;
            const y = b.props.title;
            return x.toString().localeCompare(y.toString());
          }
          return a.props.isInGroup ? 1 : -1;
        })}
    </div>
  );
}

export default Groups;
