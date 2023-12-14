import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseClient";
import Link from "next/link";
import ErrorComponent from "../components/Error";
import { LogoSVG } from "../assets/assets";

import Image from "next/image";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <article className="flex justify-start flex-col items-center h-screen bg-black">
      <Image src={LogoSVG} alt="icon" className="mt-12" />

      {error && <ErrorComponent message={error} />}
      <form
        className="w-11/12 bg-darkBlue rounded-xl mt-24 p-6"
        onSubmit={handleLogin}
      >
        <h1 className="text-white text-2xl">Login</h1>
        <section className="mt-8 relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="bg-darkBlue border-b-2 border-secondary text-white py-2 px-4 focus:outline-none w-full relative"
            required
            style={{ paddingRight: "4rem" }}
          />
          {error && !email && (
            <span
              className="text-red absolute right-2 top-1/2 transform -translate-y-1/2"
              style={{ paddingRight: "1rem" }}
            >
              {error}
            </span>
          )}
        </section>
        <section className="mt-7 relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-darkBlue border-b-2 border-secondary text-white py-2 px-4 focus:outline-none w-full relative"
            required
            style={{ paddingRight: "4rem" }}
          />
          {error && !password && (
            <span
              className="text-red absolute right-2 top-1/2 transform -translate-y-1/2"
              style={{ paddingRight: "1rem" }}
            >
              {error}
            </span>
          )}
        </section>
        <button
          type="submit"
          className="mt-5 bg-red w-full text-white py-2 px-4 rounded"
        >
          Login
        </button>
        <p className="mt-5 text-center text-white">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red">
            Sign Up
          </Link>
        </p>
      </form>
    </article>
  );
};

export default LoginPage;
