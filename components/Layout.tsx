import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { LayoutProps } from "../types";
import styles from "@/styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import { useRouter } from "next/router";

const Layout: NextPage<LayoutProps> = ({
  title,
  description,
  keywords,
  children,
}) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest Dj and other musical events",
  keywords: "music, dj, edm, events",
};
