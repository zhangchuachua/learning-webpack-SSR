import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from "./components/App";
import './static/uno.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";

const router = createBrowserRouter(routes);

const root = hydrateRoot(document.getElementById('app'), <RouterProvider router={router} />);