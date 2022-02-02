/// Fonction fetch ///
require("dotenv").config();

export const fetch_function = async (method_name, url_route) => {
  alert(process.env.REACT_APP_URL_BACKEND);
  alert("toto");
  try {
    const result = await fetch(
      `${process.env.REACT_APP_URL_BACKEND}/api/${url_route}`,
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
