import React from "react";
import styles from "@/styles/DashboardEvent.module.css";
import { NextPage } from "next";
import { UserEvents } from "types";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";

const DashboardEvent: NextPage<{
  evt: UserEvents;
  handleDelete: (eventId: number) => void;
}> = ({ evt, handleDelete }) => {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`} passHref>
        <a className={styles.edit}>
          <FaPencilAlt />
          <span>Edit Event</span>
        </a>
      </Link>
      <a
        href="#"
        className={styles.delete}
        onClick={() => handleDelete(evt.id)}
      >
        <FaTimes /> <span>delete</span>
      </a>
    </div>
  );
};

export default DashboardEvent;
