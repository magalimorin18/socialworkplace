import React, { useState } from "react";
import "./GroupForm.css";

const GroupForm = (props) => {
  const [enteredTitle, setenteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setenteredTitle(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const groupData = {
      title: enteredTitle,
    };
    props.onSaveGroupData(groupData);
    setenteredTitle("");
    console.log(enteredTitle);
    fetch("https://localhost:5001/api/Group", {
      method: "POST",
      headers: { accept: "text/plain", "Content-Type": "application/json" },
      body: JSON.stringify({ title: enteredTitle }),
    })
      .then((rep) => {
        if (rep.ok) {
          console.log("Groupe ajoute");
        } else {
          console.log("erreur");
        }
        console.log(rep);
      })
      .catch((e) => {
        console.log("erreur");
        console.log(e);
      });
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
