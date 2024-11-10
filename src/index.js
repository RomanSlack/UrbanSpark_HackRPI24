import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// DO NOT REMOVE ./App.css THIS IS NEEDED FOR TAILWIND AND DAISY TO WORK
import "./App.css"
import "./index.css";
import "./AiTest";


import Home from "./components/home";
import OpportunityCard from "./components/opportunity_card";
import OpportunityPage from "./components/opportunity_page";
import StartPage from "./pages/StartPage";
import SubmittedPage from "./pages/SubmittedPage";
import AiTest from "./AiTest";
import { OpportunityOptions } from "./components/opportunity_options";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cards",
    element: <OpportunityCard />
  },
  {
    path: "/start",
    element: <StartPage />,
  },
  {
    path: "/submitted",
    element: <SubmittedPage />,
   
  },
  {
    path: "/opportunity",
    element: <OpportunityPage />,

  },
  {
    path: "/opportunity/:category",
    element: <OpportunityOptions />
  },
  {
    path: "/AiTest",
    element: <AiTest />,

  }
]);

// DO NOT EDIT THIS LINE AT ALL
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
