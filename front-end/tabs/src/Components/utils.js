/// Fonction fetch ///
import dotenv from "dotenv";
import * as microsoftTeams from "@microsoft/teams-js";
dotenv.config();

microsoftTeams.initialize();
const getToken = new Promise((resolve, reject) => {
  microsoftTeams.authentication.getAuthToken({
    successCallback: (result) => resolve(result),
    failureCallback: (error) => reject(error),
  });
});
export const fetchFunction = async (method, url_route, body) => {
  const token = await getToken;
  if (token) {
    const headers = {
      accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/${url_route}`,
      { method, headers, body }
    );
    if (method === "GET") {
      try {
        if (result.ok) {
          return await result.json();
        } else {
          alert("Something went wrong");
        }
      } catch (e) {}
    }
  } else {
    alert("Invalid token");
    return [];
  }
};
