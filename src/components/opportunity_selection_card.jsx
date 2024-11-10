import { useEffect, useState } from "react";

export function OpportunitySelect({ name, link, address, category }) {
  const unsplash_uri = `https://api.unsplash.com/search/photos/?query=${category}?&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;

  const [getImage, setImage] = useState([]);

  useEffect(() => {
    fetch(unsplash_uri, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.results.map((img) => img.urls.regular));
      })
      .catch((error) => console.error("Error fetching images:", error));
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
          <p>{link}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-accent">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  );
}
