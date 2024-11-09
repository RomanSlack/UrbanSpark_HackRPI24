import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// DO NOT REMOVE ./App.css THIS IS NEEDED FOR TAILWIND AND DAISY TO WORK
import "./App.css"
import "./index.css";

import Home from "./components/home";
import OpportunityCard from "./components/opportunity_card";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cards",
    element: <OpportunityCard />
  }
]);

// DO NOT EDIT THIS LIKE AT ALL
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
