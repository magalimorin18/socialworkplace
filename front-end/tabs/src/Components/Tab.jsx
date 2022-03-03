import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import GroupForm from "./NewGroup/GroupForm";
import Header from "./UI/Header";
import { fetchFunction } from "./utils.js";
import ReactGA from "react-ga";

export default function Tab() {
  const [groups, setGroups] = useState([]);
  const [groupsUser, setGroupsUser] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    fetchFunction("GET", "Group").then((groups) => {
      setGroups(groups);
      console.log(groups);
    });

    fetchFunction("GET", "User/Groups").then((groupsUser) =>
      setGroupsUser(groupsUser)
    );
  }, [refresh]); // if refresh value is modified, the useEffect will be triggered

  return (
    <div>
      <Header />
      <GroupForm refreshPage={refreshPage} items={groups} />
      <Groups refreshPage={refreshPage} items={groups} myGroups={groupsUser} />
    </div>
  );
}
