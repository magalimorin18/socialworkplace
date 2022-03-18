import "./Notification.css";
import React, { useState, useRef } from "react";
import { ReactComponent as CheckIcon } from "./icons/check.svg";
import { ReactComponent as CrossIcon } from "./icons/cross.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";
import { ReactComponent as ErrorIcon } from "./icons/error.svg";

export const NotifContext = React.createContext();

function Notification(props) {
  const [list, setList] = useState([]);
  const listRef = useRef(list);
  listRef.current = list;

  function add(type, text, timeOut = 4000) {
    const newNotif = { id: Math.random(), text, type, fadeIn: true };
    setTimeout(() => {
      setList(
        listRef.current.map((notif) => {
          if (notif.id === newNotif.id) {
            return { ...newNotif, fadeIn: false };
          }
          return notif;
        })
      );
    }, timeOut);
    setList([...list, newNotif]);
  }
  function remove(notif) {
    setList(listRef.current.filter((prevNotif) => prevNotif.id !== notif.id));
  }
  return (
    <NotifContext.Provider value={{ add }}>
      {props.children}
      <div className="notifs">
        {list.map((notif) => (
          <div
            className={`notif notif-${notif.type} ${
              notif.fadeIn ? "animation-fadeIn" : " animation-fadeOut"
            }`}
            key={notif.id}
            onAnimationEnd={() => {
              if (!notif.fadeIn) {
                remove(notif);
              }
            }}
          >
            {notif.type === "info" && <InfoIcon className="icon" />}
            {notif.type === "success" && <CheckIcon className="icon" />}
            {notif.type === "error" && <ErrorIcon className="icon" />}
            <button className="cross" onClick={() => remove(notif)}>
              <CrossIcon />
            </button>
            <p className="text">{notif.text}</p>
          </div>
        ))}
      </div>
    </NotifContext.Provider>
  );
}

export default Notification;
