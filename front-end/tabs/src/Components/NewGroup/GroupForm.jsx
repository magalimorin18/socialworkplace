import React, { useState } from "react";
//import Groups from "../Groups/Groups";
import "./GroupForm.css";

const GroupForm = (props) => {
  const [enteredTitle, setenteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setenteredTitle(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault(); //empecher le formulaire de recharger la page
    const groupData = {
      title: enteredTitle,
    };
    setenteredTitle("");
    console.log(enteredTitle);
    //Verifier que le titre  props.items = contient la liste de tous les groupes
    if (enteredTitle !== "") {
      fetch("https://socialworkplace-backend.azurewebsites.net/api/Group", {
        method: "POST",
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("AccessToken")
            .toString()}`,
        },
        body: JSON.stringify({ title: enteredTitle }),
      })
        .then((rep) => {
          if (rep.ok) {
            console.log("Groupe ajoute");
            props.onSaveGroupData(groupData);
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
    <form onSubmit={SubmitHandler}>
      <div className="new-group__controls">
        <div className="new-group__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-group__actions">
          <button type="submit"> Create a New Group </button>
        </div>
      </div>
    </form>
  );
};

export default GroupForm;
