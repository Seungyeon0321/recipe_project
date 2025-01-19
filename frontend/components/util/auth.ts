import axios from "axios";

const Singup = async (email: string, password: string, username: string) => {
  const response = await axios.post("http://localhost:8080/api/auth/signup", {
    email,
    password,
    username,
  });

  return response;
};

export { Singup };
