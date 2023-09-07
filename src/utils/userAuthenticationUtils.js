export const registerUser = (users, newUser, setUsers) => {
  newUser.id = users.length + 1;
  setUsers([...users, newUser]);
};

export const loginUser = (users, credentials) => {
  const user = users.find(
    (u) =>
      u.username === credentials?.username &&
      u?.password === credentials?.password
  );
  console.log(user);
  return user;
};

export const logoutUser = (setCurrentUser) => {
  setCurrentUser(null);
};
