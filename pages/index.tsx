import type { NextPage } from "next";
import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "config";
import { Events } from "types";
import EventItem from "@/components/EventItem";
import Link from "next/link";

const Home: NextPage<{ events: Events[] }> = ({ events }) => {

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length > 0 ? (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      ) : (
        <h3>No events to show</h3>
      )}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const responseData = await axios
    .get(`${API_URL}/api/events`)
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return {
    props: {
      events: responseData.slice(0,3),
      revalidate: 1,
    },
  };
};
