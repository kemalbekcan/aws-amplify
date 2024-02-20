import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Header from './components/partials/Header';
import AddEmployee from './pages/AddEmployee';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'; // default theme
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure(awsExports);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    element: <Header />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/add",
        element: <AddEmployee />,
      },

    ],
  },
  {
    path: "*",
    element: <p>no match</p>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authenticator.Provider>
    <RouterProvider router={router} />
  </Authenticator.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
