import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Lesson from "./components/Lesson";
import Day from "./components/Day";
import LanguageList from "./components/LanguageList";
import QuarterGridByYear from "./components/QuarterGridByYear";
import FormHandler from "./components/FormHandler";
import LanguageForm from "./components/LanguageForm";
import QuarterForm from "./components/QuarterForm";
import LessonForm from "./components/LessonForm";
import DayForm from "./components/DayForm";
import ErrorPage from "./pages/ErrorPage";
import Quarter from "./components/Quarter";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import QuarterInfo from "./components/QuarterInfo";

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
      {
        path: ":lang/quarters/:quarterId/lessons/:lessonId/days/:dayId",
        element: <Day />,
      },
    ],
  },
  {
    path: "",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/admin",
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "languages",
            element: <FormHandler />,
            children: [
              { index: true, element: <LanguageList /> },
              {
                path: "add",
                element: <LanguageForm />,
              },
              {
                path: ":lang/edit",
                element: <LanguageForm />,
              },
              {
                path: ":lang/quarters",
                element: <QuarterGridByYear />,
              },
              {
                path: ":lang/quarters/add",
                element: <QuarterForm />,
              },
              {
                path: ":lang/quarters/:quarterId/edit",
                element: <QuarterForm />,
              },
              {
                path: ":lang/quarters/:quarterId/lessons",
                element: <Lesson />,
              },
              {
                path: ":lang/quarters/:quarterId/lessons/add",
                element: <LessonForm />,
              },
              {
                path: ":lang/quarters/:quarterId/lessons/:lessonId/edit",
                element: <LessonForm />,
              },
              {
                path: ":lang/quarters/:quarterId/lessons/:lessonId/days",
                element: <Day />,
              },
              {
                path: ":lang/quarters/:quarterId/lessons/:lessonId/days/add",
                element: <DayForm />,
              },
              {
                path: ":lang/quarters/:quarterId/lessons/:lessonId/days/:dayId/edit",
                element: <DayForm />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default route;
