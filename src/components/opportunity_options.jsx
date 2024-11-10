import { useLocation, useParams } from "react-router-dom";
import { OpportunitySelect } from "./opportunity_selection_card";
import SearchMap from "./map_search";
import { useEffect, useState } from "react";
import { Navbar } from "./navbar";
import { AppNavbar } from "./AppNavbar";
import instance from "../api";

async function PlacesServiceQuery() {
  // TODO use MapBox Places API Points of Interest Query Search Nearby
  // db fetch user work and user home address for local food banks

  const res = [
    {
      name: "place",
      link: "example.com",
      address: "santa cruz, ca",
      category: "earth",
    },
  ];
  return res.map((e) => {
    return (
      <OpportunitySelect
        name={e.name}
        link={e.link}
        address={e.address}
        category={e.category}
      />
    );
  });
}

export function OpportunityOptions() {
  // TODO Fetch user Address from db

  let { state } = useLocation();

  const [getPOI, setPOI] = useState([]);


  const SearchQueryParams = (category) => {
    const params = {
      Food: `food+pantry+new+york`,
      Work: `workforce+center+career+job+new+york`,
      Education: `youth+education+school+programs+new+york`,
      Volunteering: `youth+community+service+food+pantry+animal+shelter+homeless+shelter+new+york`
    };

    return params[category];
  };

  const suggest_uri = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${SearchQueryParams(
    state.category
  )}&language=en&country=us&session_token=${crypto.randomUUID()}&access_token=${
    process.env.REACT_APP_MAPBOX
  }`;

  useEffect(() => {
    fetch(suggest_uri, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.suggestions);
        setPOI(
          data.suggestions.map((e) => {
            return {
              name: e.name,
              address: e.full_address,
            };
          })
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
    <div>
        <AppNavbar />
    </div>
      <div className="bg-gradient-to-r from-yellow-200 to-orange-300 min-h-full">
        <div className="flex justify-center">
          <div>
            <div>
              <div>
                {getPOI.map((e) => {
                  return (
                    <div key={e.name}>
                      <OpportunitySelect
                        name={e.name}
                        link={""}
                        address={e.address}
                        category={state.category}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
