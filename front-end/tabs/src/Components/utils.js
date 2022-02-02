/// Fonction fetch ///
import dotenv from "dotenv";

dotenv.config();

export const fetch_function = async (method_name, url_route) => {
  try {
    const result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/${url_route}`,
      {
        method: method_name,
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("AccessToken")
            .toString()}`,
        },
      }
    );
    return await result.json();
  } catch (e) {
    alert(e);
  }
};
