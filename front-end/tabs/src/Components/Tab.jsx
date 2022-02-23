import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import GroupForm from "./NewGroup/GroupForm";
import Header from "./UI/Header";
import * as microsoftTeams from "@microsoft/teams-js";
import { fetchFunction } from "./utils.js";

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
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  useEffect(() => {
    if (hasToken) {
      fetchFunction("GET", "Group").then((group_list) => setGroups(group_list));
    }
  }, [refresh, hasToken]); // if refresh value is modified, the useEffect will be triggered

  return (
    <div>
      <p>{localStorage.getItem("AccessToken")}</p>
      <button onClick={refreshPage}>Refresh</button>
      <Header />
      <GroupForm refreshPage={refreshPage} items={groups} />
      <Groups refreshPage={refreshPage} items={groups} />
    </div>
  );
}
