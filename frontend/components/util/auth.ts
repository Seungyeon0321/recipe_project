import axios from "axios";

const Signup = async (credentials: {
  email: string;
  password: string;
  username: string;
}) => {
  const response = await axios.post("http://127.0.0.1:5000/user/login", {
    userEmail: credentials.email,
    password: credentials.password,
    name: credentials.username,
  });
  console.log("hello");

  return response;
};

export { Signup };
