import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/main.scss'
import {RouterProvider} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import routes from "./routes";
import {persistedStore, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistedStore}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
)
