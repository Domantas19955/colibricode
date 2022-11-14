import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
	createBrowserRouter,
	RouterProvider,
	Route,
  } from "react-router-dom";

import Home from './Pages/Home';
import Games from './Pages/Games';
import Main from './Layouts/Main';
import Game from './Pages/Game';

  const router = createBrowserRouter([
	{
	  path: '/',
	  element: <Main />,
	  children: [
		{
			path: '/',
			element: <Home />
		},
		{
			path: '/games',
			element: <Games />
		},
		{
			path: '/games/:gameId',
			element: <Game />
		}
	  ]
	},
  ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
     <RouterProvider router={router} />
//   </React.StrictMode>
)
