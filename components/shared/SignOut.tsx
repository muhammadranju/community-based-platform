import { authFetch } from "@/lib/authFetch";
import Cookies from "js-cookie";

export const SignOut = async () => {
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("token");
  //   Cookies.remove("token");
  //   window.location.href = "/login";

  try {
    const response = await authFetch("/user/profile", {
      method: "PATCH",
      body: JSON.stringify({
        isActive: false,
      }),
    });

    const data = await response.json();

    if (data?.success) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      Cookies.remove("token");
      window.location.href = "/login";
    }
  } catch (error) {
    console.log(error);
  }
};
