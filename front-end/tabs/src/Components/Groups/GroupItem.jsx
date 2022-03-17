import React from "react";
import "./GroupItem.css";
import { fetchFunction } from "../utils.js";
import Popup, { usePopup } from "../UI/Popup";

import { useContext } from "react";
import { NotifContext } from "../UI/Notification";

function GroupItem(props) {
  const Notif = useContext(NotifContext);

  const joinHandler = async () => {
    await fetchFunction(
      { method: "PUT", route: `Membership/${props.id}` },
      () => {
        Notif.add("success", `You joined the group ${props.title}!`);
        props.refreshPage();
      },
      () => Notif.add("error", "You can't join the group")
    );
  };

  const deleteHandler = async () => {
    await fetchFunction(
      { method: "DELETE", route: `Group/${props.id}` },
      () => {
        Notif.add("success", `You deleted the group ${props.title}!`);
        props.refreshPage();
      },
      () => Notif.add("error", "You can't delete the group")
    );
  };

  async function leaveHandler() {
    await fetchFunction(
      { method: "DELETE", route: `Membership/${props.id}` },
      () => {
        Notif.add(
          "success",
          `You are not in the group ${props.title} anymore!`
        );
        props.refreshPage();
      },
      () => Notif.add("error", "You can't leave the group")
    );
  }

  const popupDelete = usePopup();
  const popupLeaveJoin = usePopup();

  return (
    <div className="group-item">
      <div className="group-item__description">
        <h2 className="title">{props.title}</h2>
      </div>
      <div className="buttons">
        {props.isInGroup ? (
          <>
            <button
              className="button button-leave"
              onClick={popupLeaveJoin.show}
            >
              Leave the group
            </button>
            <Popup
              {...popupLeaveJoin.info}
              action={leaveHandler}
              text={`You will quit the group : ${props.title}`}
            />
          </>
        ) : (
          <>
            <button
              className="button button-join"
              onClick={popupLeaveJoin.show}
            >
              Join the group
            </button>
            <Popup
              {...popupLeaveJoin.info}
              action={joinHandler}
              text={`You are about to join the group : ${props.title}`}
            />
          </>
        )}
        <button className="button button-delete" onClick={popupDelete.show}>
          Delete the group
        </button>
        <Popup
          {...popupDelete.info}
          action={deleteHandler}
          text={`You will delete the group : ${props.title}`}
        />
      </div>
    </div>
  );
}

export default GroupItem;
