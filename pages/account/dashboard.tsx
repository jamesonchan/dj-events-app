import Layout from "@/components/Layout";
import React from "react";
import { parseCookies } from "helpers";
import { GetServerSidePropsContext, NextPage } from "next";
import axios, { AxiosError } from "axios";
import { API_URL } from "config";
import { UserEvents } from "types";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const Dashboard: NextPage<{ events: UserEvents[]; token: string }> = ({
  events,
  token,
}) => {
  const router = useRouter();
  const deleteEvent = async (id: number) => {
    if (confirm("Are your sure?")) {
      await axios
        .delete(`${API_URL}/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error: AxiosError) => toast.error(error.response?.data));
    }
    router.reload();
  };
  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        <ToastContainer />
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
  const { token } = parseCookies(context.req);
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
      token,
    },
  };
};
