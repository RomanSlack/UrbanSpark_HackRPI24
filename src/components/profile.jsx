import useLocalStorage from "@rehooks/local-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import instance from "../api";
import { GPTHandler } from "../apiHandler";
import { AppNavbar } from "./AppNavbar";

function FavoriteCard({category, name, address}) {

  return (
    <>
      <div>
        <div className="card bg-gradient-to-r from-violet-500 to-fuchsia-500 mt-2 image-full w-96 shadow-2xl">
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{address}</p>
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProfilePage() {
  const [userName, setUserName] = useLocalStorage('name');
  const [getUser, setUser] = useState();
  const [getFavorites, setFavorites] = useState();

  if (getFavorites !== undefined) {
    return (
        <div>
            <div>
            <AppNavbar />
            </div>
            <div className="grid justify-center">
                {getFavorites.map((e) => {
                return  <FavoriteCard 
                    name={e.name}
                    category={e.category}
                    address={e.address}
                    />
                })}
            </div>
        </div>
    )
  } else {
    return (
        <>  
            <AppNavbar />
            <div className="grid justify-center">
                <button className="btn btn-primary" onClick={
                    () => instance.get(`users/${userName}/addresses/`).then((res) => setFavorites(res.data))
                }>Show Opportunities</button>
            </div>
       </>
      )
  }
}
