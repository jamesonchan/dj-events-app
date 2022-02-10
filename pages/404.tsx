import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/Fa";
import React from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";

const NotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Page not found...</h4>
        <Link href="/">Back to Home</Link>
      </div>
    </Layout>
  );
};

export default NotFound;
