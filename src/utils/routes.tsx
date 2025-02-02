import React from 'react'
import { RouteObject } from "react-router-dom";

import FormBuilderPage from "../pages/FormBuilderPage";
import TemplatesPage from "../pages/TemplatesPage";
import Error404 from '../pages/Error404';
import MainLayout from '../components/layouts/MainLayout';


const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: "formbuilder/:formId",
        element: <FormBuilderPage />,
      },
      {
        path: "/",
        element: <TemplatesPage />,
      },
    ],
  },
];

export default routes;