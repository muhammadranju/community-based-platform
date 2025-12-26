import Cookies from "js-cookie";
function getToken() {
  return Cookies.get("token");
}

export default getToken;
