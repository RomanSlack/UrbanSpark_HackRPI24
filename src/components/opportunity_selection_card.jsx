import { useEffect, useState } from "react";
import instance from "../api";
import useLocalStorage from "@rehooks/local-storage";

export function OpportunitySelect({ name, link, address, category }) {
  const unsplash_uri = `https://api.unsplash.com/search/photos/?query=${category}?&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;

  const [getImage, setImage] = useState([]);

  const [getFeatureAddress, setFeatureAddress] = useState();
  const [getLat, setLat] = useState();
  const [getLong, setLong] = useState();

  const [userName] = useLocalStorage("name");

  const onAddFavorite = () => {
    instance.post(`users/${userName.replace(" ", "")}/addresses/`, {
      address: address,
      name: name,
      lat: getLat,
      long: getLong,
      url: "example.com",
    });
  };

  const geocode_uri = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&proximity=ip&access_token=${process.env.REACT_APP_MAPBOX}`;

  useEffect(() => {
    fetch(geocode_uri)
      .then((res) => res.json())
      .then((data) => {
        if (data.features === undefined) {
          setLong(0);
          setLat(0);
        } else {
          const features = data.features.map((location) => {
            return {
              long: location.properties.coordinates.longitude,
              lat: location.properties.coordinates.latitude,
            };
          });
          setLong(features[0].long);
          setLat(features[0].lat);
        }
      });
  }, []);

  useEffect(() => {
    fetch(unsplash_uri, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.results.map((img) => img.urls.regular));
      });
  }, []);

  return (
    <div>
      <div className="card bg-base-100 mt-2 image-full w-96 shadow-2xl">
        <figure>
          <img
            src={getImage[Math.floor(Math.random() * getImage.length)]}
            alt={category}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{address}</p>
          <p>{() => {}}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-accent" onClick={onAddFavorite}>
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
