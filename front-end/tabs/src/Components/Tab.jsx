import React, { useState, useEffect } from "react";
import SeeAll from "./Groups/SeeAll";
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
    ReactGA.initialize("UA-221891417-1", { gaOptions: { anonymizeIp: true } });

    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    const onSucessGroups = async (result) => {
      result = await result.json();
      setGroups(result);
    };
    const onSucessGroupsUser = async (result) => {
      result = await result.json();
      setGroupsUser(result);
    };

    const onError = () => {
      alert("The groups cannot be loaded");
    };

    const fetchGroups = async () => {
      await fetchFunction(
        { method: "GET", route: "User/Groups" },
        onSucessGroupsUser,
        onError
      );
      await fetchFunction(
        { method: "GET", route: "Group" },
        onSucessGroups,
        onError
      );
    };
    fetchGroups();
  }, [refresh]); // if refresh value is modified, the useEffect will be triggered

  return (
    <div>
      <Header />
      <GroupForm refreshPage={refreshPage} items={groups} />
      <SeeAll refreshPage={refreshPage} items={groups} myGroups={groupsUser} />
    </div>
  );
}
