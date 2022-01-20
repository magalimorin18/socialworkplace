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
      console.log(`https://localhost:5001/api/Group`);
      fetch("https://localhost:5001/api/Group", {
        method: "GET",
        headers: new Header({ Authorization: `Bearer ${token}` }),
      }).then((rep) =>
        rep
          .json()
          .then((groups) => {
            setGroups(groups);
            console.log("je suis dans la fonction App");
            console.log(groups);
          })
          .catch((e) => console.log(e))
      );
    }
  }, [refresh, token]);

  return (
    <div>
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
