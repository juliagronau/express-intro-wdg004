const users = [
  { id: 1, userName: "Mario" },
  { id: 2, userName: "Philipp" },
  { id: 3, userName: "Matthias" },
];

export const getAllUsers = (req, res) => {
  res.status(200).json(users);
};
