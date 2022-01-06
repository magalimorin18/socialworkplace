import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import NewGroup from "./NewGroup/NewGroup";
import Header from "./UI/Header";

var showFunction = Boolean(process.env.REACT_APP_FUNC_NAME);

export default function Tab() {
  const [groups, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const addGroupHandler = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    console.log(`https://localhost:5001/api/Group`);
    fetch("https://localhost:5001/api/Group", { method: "GET" }).then((rep) =>
      rep
        .json()
        .then((groups) => {
          setGroups(groups);
          console.log("je suis dans la fonction App");
          console.log(groups);
        })
        .catch((e) => console.log(e))
    );
  }, [refresh]);

  return (
    <div>
      <Header />
      <NewGroup onAddGroup={addGroupHandler} items={groups} />
      <Groups onDeleteGroup={addGroupHandler} items={groups} />
    </div>
  );
}
