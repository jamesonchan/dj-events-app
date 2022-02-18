import React, { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { AddEventsState, Events } from "types";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";
import { API_URL } from "config";
import { GetServerSidePropsContext, NextPage } from "next";
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/Fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { parseCookies } from "../../../helpers";

const EditEvent: NextPage<{ evt: Events; token: string }> = ({
  evt,
  token,
}) => {
  const { name, performers, address, venue, date, time, description } =
    evt.attributes;
  const [values, setValues] = useState<AddEventsState>({
    name,
    performers,
    address,
    venue,
    date,
    time,
    description,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.attributes.image.data?.attributes.formats.thumbnail.url
  );
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  console.log(evt);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill in all fields!");
    }

    try {
      const responseData = await axios
        .put(
          `${API_URL}/api/events/${evt.id}`,
          {
            data: values,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data.data.attributes)
        .catch((error: AxiosError) => {
          if (
            error.response?.status === 403 ||
            error.response?.status === 401
          ) {
            toast.error("Unauthorized");
            return;
          }
        });
      router.push(`/events/${responseData.slug}`);
    } catch (error) {}
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    const responseData = await axios
      .get(`${API_URL}/api/events/${evt.id}`, {
        params: {
          populate: "image",
        },
      })
      .then((res) => res.data.data.attributes)
      .catch((error: AxiosError) => toast.error(error.response?.data));
    setImagePreview(responseData.image?.data.attributes.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type="submit" value="Edit Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} width={170} height={100} alt="Event Image" />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}
      <div>
        <button
          className="btn-secondary btn-icon"
          onClick={() => setShowModal(true)}
        >
          <FaImage /> <span>Set Image</span>
        </button>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Event Image"
      >
        <ImageUpload
          evtId={evt.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
};

export default EditEvent;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;
  const { token } = parseCookies(context.req);

  const responseData = await axios
    .get(`${API_URL}/api/events/${id}`, {
      params: {
        populate: "image",
      },
    })
    .then((res) => res.data.data)
    .catch((error) => console.log(error));

  return {
    props: {
      evt: responseData,
      token,
    },
  };
};
