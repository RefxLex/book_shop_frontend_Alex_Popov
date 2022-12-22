export function getAuthUser() {
  const data = localStorage.getItem("data");
  const auth = localStorage.getItem("auth");
  if (!data) return { data: null, auth: null, permission: null };
  return { data: JSON.parse(data), auth , permission: JSON.parse(data).role == "user" ? false : true};
}

export default getAuthUser;
