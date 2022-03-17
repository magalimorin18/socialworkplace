import React from "react";
import "./GroupItem.css";
import { fetchFunction } from "../utils.js";
import ReactGA from "react-ga4";

function GroupItem(props) {
  const joinHandler = async () => {
    if (window.confirm(`You will join the group ${props.title} :D`)) {
      await fetchFunction(
        { method: "PUT", route: `Membership/${props.id}` },
        () => {
          alert(`You joined the group ${props.title}!`);
          props.refreshPage();
          ReactGA.event({
            category: "User",
            action: "Join a group",
          });
        },
        () => alert("You can't join the group")
      );
    }
  };

  const deleteHandler = async () => {
    if (
      window.confirm(`You are about to delete the group ${props.title} /!\\`)
    ) {
      await fetchFunction(
        { method: "DELETE", route: `Group/${props.id}` },
        () => {
          alert(`You deleted the group ${props.title}!`);
          props.refreshPage();
          ReactGA.event({
            category: "Group",
            action: "Delete a group",
          });
        },
        () => alert("You can't delete the group")
      );
    }
  };

  async function leaveHandler() {
    if (window.confirm(`You will quit the group ${props.title} :(`)) {
      await fetchFunction(
        { method: "DELETE", route: `Membership/${props.id}` },
        () => {
          alert(`You are not in the group ${props.title} anymore!`);
          props.refreshPage();
          ReactGA.event({
            category: "User",
            action: "Leave a group",
          });
        },
        () => alert("You can't leave the group")
      );
    }
  }
  return (
    <div className="group-item">
      <div className="group-item__description">
        <h2 className="title">{props.title}</h2>
      </div>
      <div className="buttons">
        {props.isInGroup ? (
          <button className="button button-leave" onClick={leaveHandler}>
            Leave the group
          </button>
        ) : (
          <button className="button button-join" onClick={joinHandler}>
            Join the group
          </button>
        )}
        <button className="button button-delete" onClick={deleteHandler}>
          Delete the group
        </button>
      </div>
    </div>
  );
}

export default GroupItem;
