import React from "react";
import "./GroupItem.css";
import Card from "../UI/Card";

function GroupItem(props) {
  const joinHandler = () => {
    console.log("groupe rejoint");
    console.log(props.id);
    if (window.confirm(`Vous souhaiter rejoindre le groupe ${props.title}`)) {
      fetch(
        `https://socialworkplace-backend.azurewebsites.net/api/Membership/${props.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("AccessToken")
              .toString()}`,
          },
        }
      )
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
      fetch(
        `https://socialworkplace-backend.azurewebsites.net/api/Group/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("AccessToken")
              .toString()}`,
          },
        }
      )
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

  function leaveHandler() {
    console.log("Quitter le groupe ?");
    if (window.confirm(`Vous allez quitter le groupe ${props.title}`)) {
      fetch(
        `https://socialworkplace-backend.azurewebsites.net/api/Membership/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("AccessToken")
              .toString()}`,
          },
        }
      )
        .then((rep) => {
          if (rep.ok) {
            console.log("Groupe quitté");
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
  }

  return (
    <Card className="group-item">
      <div className="group-item__description">
        <h2>{props.title}</h2>
      </div>
      <button className="button__b" onClick={joinHandler}>
        Join the group
      </button>
      <button className="button__b" onClick={leaveHandler}>
        Leave the group
      </button>
      <button className="button__d" onClick={deleteHandler}>
        Delete the group
      </button>
    </Card>
  );
}

export default GroupItem;
