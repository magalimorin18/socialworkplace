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
    // Rajouter en entrée de delete handler l'id du groupe
    // Faire en corte que dans Groups
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
