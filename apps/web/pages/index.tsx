import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import LandingPage from "../components/landing";
import MainLayout from "@/components/layouts/MainLayout";
const Home = () => {
  return (
    <>
      <LandingPage />
    </>
  );
};
Home.PageLayout = MainLayout;
export default Home;
