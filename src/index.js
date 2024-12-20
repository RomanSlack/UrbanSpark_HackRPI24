import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// DO NOT REMOVE ./App.css THIS IS NEEDED FOR TAILWIND AND DAISY TO WORK
import "./App.css";
import "./index.css";
import "./AiTest";

import Home from "./components/home";
import OpportunityCard from "./components/opportunity_card";
import OpportunityPage from "./components/opportunity_page";
import StartPage from "./pages/StartPage";
import SubmittedPage from "./pages/SubmittedPage";
import AiTest from "./AiTest";
import { OpportunityOptions } from "./components/opportunity_options";
import LoadingPage from "./components/LoadingPage";
import Onboarding from "./components/Onboarding";
import ResultsPage from "./components/resultspage"; // Ensure correct capitalization in file names

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
    path: "/loading",
    element: <LoadingPage />
  },
  {
    path: "/onboarding",
    element: <Onboarding />
  },
  {
    path: "/AiTest",
    element: <AiTest />,
  },
  {
    path: "/results",
    element: <ResultsPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
