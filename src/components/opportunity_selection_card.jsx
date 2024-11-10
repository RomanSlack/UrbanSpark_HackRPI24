import { useEffect, useState } from "react";

export function OpportunitySelect({ name, link, address, category }) {
  const unsplash_uri = `https://api.unsplash.com/search/photos/?query=${category}?&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`;

  const [getImage, setImage] = useState("");

  useEffect(() => {
    fetch(unsplash_uri, {
      method: "GET",
    }).then((res) => {
        res.json()
        .then((res) => res.results.map((img) => {
            setImage(img['urls']['regular'])
        }))
    }
    )
    }, []);

  return (
    <div>
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
          <img
          src={getImage}
            alt={category}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{address}</p>
          <div>
            <a href={link}>More Information</a>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  );
}
