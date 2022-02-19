import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Events } from "types";
import ReactMapGL, { Marker } from "react-map-gl";
import Geocode from "react-geocode";
import Image from "next/image";

const EventMap: NextPage<{ evt: Events }> = ({ evt }) => {
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: "100%",
    height: "500px",
    zoom: 12,
  });

  console.log(lat, lng);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    Geocode.fromAddress(evt.attributes.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loading) {
    return <div>loading..</div>;
  }

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jamesonchan/cksjuwuy300ep18qyceg3onvg"
      {...viewport}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
    >
      {/* <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} alt="map" />
      </Marker> */}
    </ReactMapGL>
  );
};

export default EventMap;
