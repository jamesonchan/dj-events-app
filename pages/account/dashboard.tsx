import Layout from "@/components/Layout";
import React from "react";
import { parseCookie } from "helpers";
import { GetServerSidePropsContext, NextPage } from "next";
import axios from "axios";
import { API_URL } from "config";
import { UserEvents } from "types";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";

const Dashboard: NextPage<{ events: UserEvents[] }> = ({ events }) => {
  console.log(events);
  const deleteEvent = async (eventId: number) => {
    console.log(eventId);
  };
  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events ? (
          events.map((evt) => (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          ))
        ) : (
          <div>Something went wrong, please log in</div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { token } = parseCookie(context.req);
  const resData = await axios
    .get(`${API_URL}/api/events/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error.message));
  return {
    props: {
      events: resData || null,
    },
  };
};
