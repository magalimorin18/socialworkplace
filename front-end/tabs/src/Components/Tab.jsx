import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import NewGroup from "./NewGroup/NewGroup";
import Header from "./UI/Header";
import * as microsoftTeams from "@microsoft/teams-js";
import { fetch_function } from "utils.js";

export default function Tab() {
  const [groups, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  var authTokenRequest = {
    successCallback: function (result) {
      window.localStorage.setItem("AccessToken", result);
      refreshPage(); // permet que le useEffect s'actualise si le token passe de vide à rempli
    },
    failureCallback: function (error) {
      alert("Failure: " + error);
    },
  };

  microsoftTeams.authentication.getAuthToken(authTokenRequest);

  useEffect(() => {
    if (localStorage.getItem("AccessToken")) {
      const group_list = fetch_function("GET", "Group");
      setGroups(group_list);
    }
  }, [refresh]); // if refresh is modified, useeffect will be triggered

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
