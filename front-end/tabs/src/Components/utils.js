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
export const fetchFunction = async (request, onSucess, onError) => {
  const token = await getToken;
  if (token) {
    const headers = {
      accept: "text/plain",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/${request.route}`,
      { method: request.method, headers, body: request.body }
    );

    if (result.ok) {
      onSucess(result);
    } else {
      onError();
    }
  }
};
