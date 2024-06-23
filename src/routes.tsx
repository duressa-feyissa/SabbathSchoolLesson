import { createBrowserRouter } from "react-router-dom";
import LanguageList from "./components/LanguageList";
import Lesson from "./components/Lesson";
import Quarter from "./components/Quarter";
import QuarterInfo from "./components/QuarterInfo";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "languages", element: <LanguageList /> },
      { path: ":lang/quarters", element: <QuarterInfo /> },
      { path: ":lang/quarters/:quarterId", element: <Quarter /> },
      {
        path: ":lang/quarters/:quarterId/lessons/:lessonId",
        element: <Lesson />,
      },
    ],
  },
]);

export default route;
