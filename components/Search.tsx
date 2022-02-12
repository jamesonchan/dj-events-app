import React, { useState } from "react";
import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";

const Search = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?term=${term}`);
    setTerm("");
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};

export default Search;
