import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from "./components/App";
import './static/uno.css'

const root = hydrateRoot(document.getElementById('app'), <App/>);