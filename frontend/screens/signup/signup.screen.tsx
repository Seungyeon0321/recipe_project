import AuthContent from "../../components/Auth/AuthContent";
import { Signup } from "../../components/util/auth";
import axios from "axios";

export default function SignupScreen() {
  async function signupHandler(credentials: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      console.log("signupHandler2");
      // const response = await axios.post("http://127.0.0.1:5000/user/signup", {
      //   userEmail: credentials.email,
      //   password: credentials.password,
      //   passwordConfirm: credentials.password,
      //   name: credentials.username,
      // });

      const response = await axios.get("http://127.0.0.1:5000/posts");

      console.log(response);

      return response;
    } catch (error) {
      console.info(error);
      console.log(error);
    }
  }

  return (
    <>
      <AuthContent onAuthenticate={signupHandler} />
    </>
  );
}
