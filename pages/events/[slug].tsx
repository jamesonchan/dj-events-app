import EventMap from "@/components/EventMap";
import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import axios from "axios";
import { API_URL } from "config";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import qs from "qs";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Events } from "types";

const Event: NextPage<{ evt: Events }> = ({ evt }) => {
  const { date, time, name, performers, description, venue, address } =
    evt.attributes;
  const { url: mediumUrl } =
    evt.attributes.image.data.attributes.formats.medium;
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(date).toLocaleDateString("en-US")} at {time}
        </span>
        <h1>{name}</h1>
        <ToastContainer />
        {mediumUrl ? (
          <div className={styles.image}>
            <Image src={mediumUrl} width={960} height={600} alt="Large image" />
          </div>
        ) : null}
        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description:</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <EventMap evt={evt} />

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
    .then((res) => res.data.data)
    .catch((error) => console.log(error));
  const paths = responseData.map((data: Events) => ({
    params: {
      slug: data.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params: { slug } }: any) => {
  const responseData = await axios
    .get(`${API_URL}/api/events`, {
      params: {
        filters: {
          slug: { $eq: slug },
        },
        populate: "image",
      },
      paramsSerializer(params) {
        return qs.stringify(params);
      },
    })
    .then((res) => res.data.data)
    .catch((error) => console.log(error));

  return {
    props: {
      evt: responseData[0],
    },
    revalidate: 1,
  };
};
