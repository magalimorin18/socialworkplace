import React, { useState, useEffect } from "react";
import Groups from "./Groups/Groups";
import NewGroup from "./NewGroup/NewGroup";
import Header from "./UI/Header";
//import { useTeams } from "msteams-react-base-component";
import * as microsoftTeams from "@microsoft/teams-js";

// var showFunction = Boolean(process.env.REACT_APP_FUNC_NAME);

export default function Tab() {
  const [groups, setGroups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  // console.log(microsoftTeams.authentication.getAuthToken());
  // useEffect(() => {
  //   console.log(
  //     `https://login.microsoftonline.com/upslidedev.onmicrosoft.com/oauth2/v2.0/authorize?client_id=02409369-a990-435b-a640-64e953388932&response_type=token&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth-end.html&scope=0b766349-a7a1-4901-ac04-3a6304bf211c/.default&response_mode=fragment`
  //   );
  //   console.log(window.location.hash.split("&")[0].substring(14));
  // }, []); // Tableau de dépendance vide donc appelle que deux fois (quand le compensant est crée et quand il n'est plus affiché)

  var authTokenRequest = {
    successCallback: function (result) {
      console.log("Success: " + result);
    },
    failureCallback: function (error) {
      console.log("Failure: " + error);
    },
  };
  //microsoftTeams.authentication.getAuthToken(authTokenRequest);

  // useEffect(() => {
  //   console.log(`https://localhost:5001/api/Group`);
  //   fetch("https://localhost:5001/api/Group", { method: "GET" }).then((rep) =>
  //     rep
  //       .json()
  //       .then((groups) => {
  //         setGroups(groups);
  //         console.log("je suis dans la fonction App");
  //         console.log(groups);
  //       })
  //       .catch((e) => console.log(e))
  //   );
  // }, [refresh]);

  return (
    <div>
      <Header />
      <button
        onClick={() => {
          microsoftTeams.authentication.getAuthToken(authTokenRequest);
          console.log("onclick");
        }}
      >
        Cliquez
      </button>
      <NewGroup onAddGroup={refreshPage} items={groups} />
      <Groups
        onDeleteGroup={refreshPage}
        onJoinGroup={refreshPage}
        items={groups}
      />
    </div>
  );
}
