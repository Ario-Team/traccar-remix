import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import mapboxCss from "mapbox-gl/dist/mapbox-gl.css";
import { RecoilRoot } from "recoil";

import styles from "./styles/app.css";
import globalStyles from "./styles/global.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: globalStyles,
    },
    {
      rel: "stylesheet",
      href: mapboxCss,
    },
  ];
};

export default function App() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <RecoilRoot>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </RecoilRoot>
      </body>
    </html>
  );
}
