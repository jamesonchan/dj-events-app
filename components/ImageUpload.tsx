import { NextPage } from "next";
import React, { useState } from "react";
import { ImageUploadProps } from "types";
import styles from "@/styles/Form.module.css";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "config";
import { toast, ToastContainer } from "react-toastify";

const ImageUpload: NextPage<ImageUploadProps> = ({
  evtId,
  imageUploaded,
  token,
}) => {
  const [image, setImage] = useState<any>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("api::event.event", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    await axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res: AxiosResponse) => console.log(res.data))
      .catch((error: AxiosError) => toast.error(error.response?.data));

    imageUploaded();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0]);
  };
  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
