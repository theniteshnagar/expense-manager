const HandleLogout = (navigate) => {
  localStorage.removeItem("user");
  navigate("/login");
};

export default HandleLogout;
