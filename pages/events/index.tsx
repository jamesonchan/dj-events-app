import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import axios from "axios";
import { API_URL, PER_PAGE } from "config";
import type { GetServerSidePropsContext, NextPage } from "next";
import qs from "qs";
import { Events } from "types";

const Events: NextPage<{
  events: Events[];
  total: number;
}> = ({ events, total }) => {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length > 0 ? (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      ) : (
        <h3>No events to show</h3>
      )}
      <Pagination total={total} />
    </Layout>
  );
};

export default Events;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // calculate start page
  const page = context.query.page;

  // fetch total
  const total = await axios
    .get(`${API_URL}/api/events`)
    .then((res) => res.data.meta.pagination.total)
    .catch((error) => console.log(error));

  // fetch events
  const responseData = await axios
    .get(`${API_URL}/api/events`, {
      params: {
        sort: "date:ASC",
        populate: "image",
        pagination: {
          page: Number(page) || 1,
          pageSize: PER_PAGE,
        },
      },
      paramsSerializer(params) {
        return qs.stringify(params);
      },
    })
    .then((res) => res.data.data)
    .catch((error) => console.log(error));

  return {
    props: {
      events: responseData,
      total,
    },
  };
};
