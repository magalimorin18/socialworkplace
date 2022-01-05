import React, { useState } from "react";
// import ExpenseDate from './ExpenseDate';
import "./GroupItem.css";
import Card from "../UI/Card";

function GroupItem(props) {
  const [title, setTitle] = useState(props.title);

  const clickHandler = () => {
    setTitle("Updated!!");
    console.log(title);
  };
  const deleteHandler = () => {
    console.log("groupe supprimé");
  };

  return (
    <Card className="group-item">
      <div className="group-item__description">
        <h2>{props.title}</h2>
      </div>
      <button className="button__b" onClick={clickHandler}>
        Join the group
      </button>
      <button className="button__d" onClick={deleteHandler}>
        Delete the group
      </button>
    </Card>
  );
}

export default GroupItem;

// format document : shit + alt + F

//Important : have one root element

// Attention : className instead of class
