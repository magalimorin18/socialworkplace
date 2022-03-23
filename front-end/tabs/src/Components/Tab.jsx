import React, { useState, useEffect, useContext } from "react";
import SeeAll from "./Groups/SeeAll";
import GroupForm from "./NewGroup/GroupForm";
import Header from "./UI/Header";
import { fetchFunction } from "./utils.js";
import { NotifContext } from "./UI/Notification";
import { ReactComponent as LoadingIcon } from "./UI/icons/loading.svg";
import ReactGA from "react-ga4";
import "./Tab.css";

export default function Tab() {
  const Notif = useContext(NotifContext);

  const [groups, setGroups] = useState([]);
  const [groupsUser, setGroupsUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    ReactGA.send(window.location.pathname);
  }, []);

  useEffect(() => {
    const onSucessGroups = async (result) => {
      result = await result.json();
      setGroups(result);
      setLoading(false);
    };
    const onSucessGroupsUser = async (result) => {
      result = await result.json();
      setGroupsUser(result);
    };

    const onError = () => {
      Notif.add("error", "The groups cannot be loaded");
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
    // eslint-disable-next-line
  }, [refresh]); //No need to pass Notif because there will be an infinite loop. Notif will not change.

  return (
    <div>
      <Header />
      <GroupForm refreshPage={refreshPage} items={groups} />

      {loading ? (
        <div className="loading">
          <LoadingIcon className="icon-loading" />
        </div>
      ) : (
        <SeeAll
          refreshPage={refreshPage}
          items={groups}
          myGroups={groupsUser}
        />
      )}
    </div>
  );
}
