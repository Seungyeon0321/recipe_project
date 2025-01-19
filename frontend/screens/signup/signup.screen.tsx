import AuthContent from "../../components/Auth/AuthContent";

export default function SignupScreen() {
  return (
    <>
      <AuthContent onAuthenticate={signupHandler} />
    </>
  );
}
