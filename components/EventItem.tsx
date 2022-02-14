import React from "react";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { Events } from "types";
import { NextPage } from "next";
import Link from "next/link";

const EventItem: NextPage<{ evt: Events }> = ({ evt }) => {
  const { date, time, name, slug } = evt.attributes;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.attributes.image.data?.attributes.formats.thumbnail.url
              ? evt.attributes.image.data?.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
          objectFit="cover"
          alt="Event Image"
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(date).toLocaleDateString("en-US")} at {time}
        </span>
        <h3>{name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
