/// Fonction fetch ///
import dotenv from "dotenv";
dotenv.config();

export const fetchFunction = async (method_name, url_route, body) => {
  // alert(process.env.REACT_APP_BACKEND_URL);
  try {
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/${url_route}`,
      {
        method: method_name,
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage
            .getItem("AccessToken")
            .toString()}`,
        },
        body: body,
      }
    );
    return await result.json();
  } catch (e) {
    alert(e);
  }
};
