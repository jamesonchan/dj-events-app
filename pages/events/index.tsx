import type { NextPage } from "next";
import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "config";
import { Events } from "types";
import EventItem from "@/components/EventItem";

const Events: NextPage<{ events: Events[] }> = ({ events }) => {
  console.log(events);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length > 0 ? (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      ) : (
        <h3>No events to show</h3>
      )}
    </Layout>
  );
};

export default Events;

export const getStaticProps = async () => {
  const responseData = await axios
    .get(`${API_URL}/api/events`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return {
    props: {
      events: responseData,
      revalidate: 1,
    },
  };
};
