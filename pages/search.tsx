import type { GetServerSidePropsContext, NextPage } from "next";
import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "config";
import { Events } from "types";
import EventItem from "@/components/EventItem";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

const Search: NextPage<{ events: Events[] }> = ({ events }) => {
  console.log(events);
  const router = useRouter();
  return (
    <Layout title="Search Results">
        <Link href='/events'>Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length > 0 ? (
        events.map((evt) => <EventItem key={evt.id} evt={evt} />)
      ) : (
        <h3>No events to show</h3>
      )}
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { term } = context.query;
  const responseData = await axios
    .get(`${API_URL}/api/events`, {
      params: {
        filters: {
          $or: [
            { name: { $contains: term } },
            { performers: { $contains: term } },
            { description: { $contains: term } },
            { venue: { $contains: term } },
          ],
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
      events: responseData,
    },
  };
};
