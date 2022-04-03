import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>
)
