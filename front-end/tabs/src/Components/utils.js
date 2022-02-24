/// Fonction fetch ///
import dotenv from "dotenv";
import * as microsoftTeams from "@microsoft/teams-js";
dotenv.config();

const getToken = () => {
  let token = "";
  const authTokenRequest = {
    successCallback: function (result) {
      token = result;
    },
    failureCallback: function (error) {
      alert("Failure: " + error);
    },
  };
  microsoftTeams.authentication.getAuthToken(authTokenRequest);
  return token;
};
export const fetchFunction = async (method, url_route, body) => {
  const token = getToken();
  if (token) {
    const headers = {
      accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/${url_route}`,
        { method, headers, body }
      );
      if (result.ok) {
        return await result.json();
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      alert(e);
    }
  } else {
    alert("Invalid token");
  }
};
