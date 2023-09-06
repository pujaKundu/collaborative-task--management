export const registerUser = (users, newUser, setUsers) => {
  newUser.id = users.length + 1;
  setUsers([...users, newUser]);
};

export const validateRegistration = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const loginUser = (users, credentials, setCurrentUser) => {
  const user = users.find(
    (u) =>
      u.username === credentials?.username && u?.password === credentials?.password
  );
  setCurrentUser(user);
};

export const logoutUser = (setCurrentUser) => {
  setCurrentUser(null);
};

