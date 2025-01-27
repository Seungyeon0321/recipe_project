import axios from "axios";
import client from "./client";

async function auth(credentials: {
  mode: string;
  email: string;
  password: string;
  username?: string;
}) {
  try {
    const response = await axios.post(
      `${client.defaults.baseURL}/user/${credentials.mode}`,
      {
        userEmail: credentials.email,
        password: credentials.password,
        name: credentials.username ? credentials.username : "",
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

const Signup = async (credentials: {
  email: string;
  password: string;
  username: string;
}) => {
  await auth({ mode: "signup", ...credentials });
};

const Login = async (credentials: { email: string; password: string }) => {
  await auth({ mode: "login", ...credentials });
};

export { Signup, Login };
