import React from "react";
import "./NewGroup.css";

import GroupForm from "./GroupForm";

const NewGroup = (props) => {
  return (
    <div className="new-group">
      <GroupForm onSaveGroupData={props.onAddGroup} items={props.items} />
    </div>
  );
};

export default NewGroup;
