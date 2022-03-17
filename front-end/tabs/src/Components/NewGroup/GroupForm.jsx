import React, { useState } from "react";
import "./GroupForm.css";
import { fetchFunction } from "../utils.js";
import ReactGA from "react-ga4";

const GroupForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault(); //prevent the form to refresh the page
    const listGroupTitle = props.items.map((group) => group.title);
    const isExistingTitle = listGroupTitle.includes(enteredTitle);
    if (enteredTitle !== "" && !isExistingTitle) {
      const body = JSON.stringify({ title: enteredTitle });
      const onSucess = () => {
        alert(`You created the group ${enteredTitle}!`);
        props.refreshPage();
        setEnteredTitle("");
        ReactGA.event({
          category: "Group",
          action: "Created a new group",
        });
      };
      const onError = () => {
        alert(`The group ${enteredTitle} couldn't be added`);
      };
      await fetchFunction(
        { method: "POST", route: "Group", body },
        onSucess,
        onError
      );
    }
  };

  return (
    <form onSubmit={submitHandler} className="new-group">
      <input
        className="new-group-title-input"
        id="title"
        type="text"
        placeholder="Enter title"
        value={enteredTitle}
        onChange={titleChangeHandler}
      />
      <button className="new-group-button button" type="submit">
        Create a new group
      </button>
    </form>
  );
};

export default GroupForm;
