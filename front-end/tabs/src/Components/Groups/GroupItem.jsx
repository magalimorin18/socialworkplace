import React from "react";
import "./GroupItem.css";
import Card from "../UI/Card";
import { fetchFunction } from "../utils.js";

function GroupItem(props) {
  const joinHandler = async () => {
    if (window.confirm(`You will join the group ${props.title} :D`)) {
      await fetchFunction("PUT", `Membership/${props.id}`);
      props.refreshPage();
    }
  };

  const deleteHandler = async () => {
    if (
      window.confirm(`You are about to delete the group ${props.title} /!\\`)
    ) {
      await fetchFunction("DELETE", `Group/${props.id}`);
      props.refreshPage();
    }
  };

  async function leaveHandler() {
    if (window.confirm(`You will quit the group ${props.title} :(`)) {
      await fetchFunction("DELETE", `Membership/${props.id}`);
      props.refreshPage();
    }
  }
  // TODO cleaner les css
  return (
    <Card className="group-item">
      <div className="group-item__description">
        <h2>{props.title}</h2>
      </div>
      {props.isInGroup ? (
        <button className="button__b" onClick={leaveHandler}>
          Leave the group
        </button>
      ) : (
        <button className="button__b" onClick={joinHandler}>
          Join the group
        </button>
      )}
      <button className="button__d" onClick={deleteHandler}>
        Delete the group
      </button>
    </Card>
  );
}

export default GroupItem;
