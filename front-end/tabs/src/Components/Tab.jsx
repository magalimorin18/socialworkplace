import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import NewGroup from "./NewGroup/NewGroup";
import Header from "./UI/Header";
import * as microsoftTeams from "@microsoft/teams-js";
import { fetch_function } from "./utils.js";

export default function Tab() {
  const [groups, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  var authTokenRequest = {
    successCallback: function (result) {
      window.localStorage.setItem("AccessToken", result);
      setHasToken(true); // permet que le useEffect s'actualise si le token passe de vide à rempli
    },
    failureCallback: function (error) {
      alert("Failure: " + error);
    },
  };

  useEffect(
    () => microsoftTeams.authentication.getAuthToken(authTokenRequest),
    []
  );

  useEffect(() => {
    if (hasToken) {
      fetch_function("GET", "Group").then((group_list) =>
        setGroups(group_list)
      );
    }
  }, [refresh, hasToken]); // if refresh is modified, useeffect will be triggered

  return (
    <div>
      <p>{localStorage.getItem("AccessToken").toString()}</p>
      <button onClick={() => refreshPage()}>Refresh</button>
      <Header />
      <NewGroup onAddGroup={refreshPage} items={groups} />
      <Groups
        onDeleteGroup={refreshPage}
        onJoinGroup={refreshPage}
        items={groups}
      />
    </div>
  );
}
