import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { HeroText } from "../components/HeroText";
import { LoginOrRegister } from "../components/LoginOrRegister";

const Register: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>quiz app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <HeroText isLogin={false} />
          <LoginOrRegister isLogin={false} />
        </div>
      </main>
    </div>
  );
};

export default Register;
