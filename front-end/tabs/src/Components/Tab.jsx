import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import NewGroup from "./NewGroup/NewGroup";
import Header from "./UI/Header";
//import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

// var showFunction = Boolean(process.env.REACT_APP_FUNC_NAME);

export default function Tab() {
  const [groups, setGroups] = useState([]);
  const [token, setToken] = useState("");
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  var authTokenRequest = {
    successCallback: function (result) {
      window.localStorage.setItem("AccessToken", result);
      setToken(result);
    },
    failureCallback: function (error) {
      alert("Failure: " + error);
    },
  };

  microsoftTeams.authentication.getAuthToken(authTokenRequest);

  useEffect(() => {
    if (token) {
      console.log(`http://localhost:5000/api/Group`);
      fetch("http://localhost:5000/api/Group", {
        method: "GET",
        headers: { Authorization: `Bearer ${token.toString()}` },
      })
        .then(
          (rep) =>
            rep.json().then((groups) => {
              setGroups(groups);
            })
          //.catch((e) => console.logr(e))
        )
        .catch((e) => alert(e));
    }
  }, [refresh, token]); // permet que le useEffect s'actualise si le token passe de vide à rempli

  return (
    <div>
      <p>{token.toString()}</p>
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
