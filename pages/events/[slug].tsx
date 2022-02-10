import React from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "config";
import { Event, Events } from "types";
import { GetServerSidePropsContext, NextPage } from "next";
import styles from "@/styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/Fa";
import Link from "next/link";
import Image from "next/image";

const Event: NextPage<Event> = ({ evt }) => {
  const deleteEvent = () => {};

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete event
          </a>
        </div>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} alt="Large image" />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Event;

export const getStaticPaths = async () => {
  const responseData = await axios
    .get(`${API_URL}/api/events`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
  const paths = responseData.map((data: Events) => ({
    params: {
      slug: data.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params: { slug } }: any) => {
  const responseData = await axios
    .get(`${API_URL}/api/events/${slug}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return {
    props: {
      evt: responseData[0],
    },
    revalidate: 1,
  };
};
