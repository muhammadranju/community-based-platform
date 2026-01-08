// "use client";
// function UserInfo() {
//   return JSON.parse(localStorage.getItem("user") || "{}");
// }

// export default UserInfo;

"use client";

let cachedUser: any = null;

export default function getUser() {
  if (typeof window === "undefined") return null;

  if (cachedUser) return cachedUser;

  try {
    const stored = localStorage.getItem("user");
    cachedUser = stored ? JSON.parse(stored) : null;
    return cachedUser;
  } catch {
    return null;
  }
}
