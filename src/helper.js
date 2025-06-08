export const getAxiosOptions = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const token = user?.access_token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
