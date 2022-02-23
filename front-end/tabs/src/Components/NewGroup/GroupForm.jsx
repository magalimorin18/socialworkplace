import React, { useState } from "react";
import "./GroupForm.css";
import { fetchFunction } from "../utils.js";

const GroupForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault(); //empeche le formulaire de recharger la page
    const listGroupTitle = props.items.map((group) => group.title);
    const isExistingTitle = listGroupTitle.includes(enteredTitle);
    if (enteredTitle !== "" && !isExistingTitle) {
      const body = JSON.stringify({ title: enteredTitle });
      await fetchFunction("POST", "Group", body);
      props.refreshPage();
      setEnteredTitle("");
    }
  };

  return (
    <form onSubmit={submitHandler} className="new-group">
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
