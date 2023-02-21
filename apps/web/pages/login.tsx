import useAuth from "@/hooks/useAuth";
import { sign } from "crypto";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  const { signIn } = useAuth();

  return (
    <div className="flex flex-col space-y-4">
      <button onClick={() => signIn("google", "test", "https://google.com")}>
        Sign in with google
      </button>

      <button onClick={() => signIn("github", "test", "https://google.com")}>
        Sign in with github
      </button>

      <button onClick={() => signIn("discord", "test", "https://google.com")}>
        Sign in with discord
      </button>
    </div>
  );
};

export default LoginPage;
