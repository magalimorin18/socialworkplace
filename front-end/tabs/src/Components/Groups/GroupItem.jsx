import React, { useState } from "react";
// import ExpenseDate from './ExpenseDate';
import "./GroupItem.css";
import Card from "../UI/Card";

function GroupItem(props) {
  const [title, setTitle] = useState(props.title);

  const joinHandler = () => {
    console.log("groupe rejoint");
    console.log(props.id);
    if (window.confirm(`Vous souhaiter rejoindre le groupe ${props.title}`)) {
      fetch(`https://localhost:5001/api/User/${props.id}`, {
        method: "PUT",
      })
        .then((rep) => {
          if (rep.ok) {
            console.log("Groupe rejoint");
            props.onJoinGroupData();
          } else {
            console.log("erreur");
          }
          console.log(rep);
        })
        .catch((e) => {
          console.log("erreur");
          console.log(e);
        });
    }
  };
  const deleteHandler = () => {
    console.log("groupe supprimé");
    console.log(props.id);
    if (window.confirm("vous allez supprimer le groupe")) {
      fetch(`https://localhost:5001/api/Group/${props.id}`, {
        method: "DELETE",
      })
        .then((rep) => {
          if (rep.ok) {
            console.log("Groupe supp");
            props.onDeleteGroupData();
          } else {
            console.log("erreur");
          }
          console.log(rep);
        })
        .catch((e) => {
          console.log("erreur");
          console.log(e);
        });
    }
  };

  return (
    <Card className="group-item">
      <div className="group-item__description">
        <h2>{props.title}</h2>
      </div>
      <button className="button__b" onClick={joinHandler}>
        Join the group
      </button>
      <button className="button__d" onClick={deleteHandler}>
        Delete the group
      </button>
    </Card>
  );
}

export default GroupItem;
