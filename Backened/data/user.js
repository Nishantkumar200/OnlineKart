import bcrypt from "bcrypt";
const user = 
  [
    {
      name: "Nishant Kumar",
      email: "nishant@gmail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: "true",
    },
    {
      name: "Nishant",
      email: "nishant123@gmail.com",
      password: bcrypt.hashSync("12345", 8),
      isAdmin: "false",
    },
  ]


export default user;
