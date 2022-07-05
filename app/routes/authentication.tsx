import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getSession } from "~/sessions";

import runningTruckGif from "../images/gifs/running_truck.gif";
import logoSVG from "../images/svgs/logo.svg";

export const meta: MetaFunction = () => {
  return {
    title: "Unalink Tracking Platform",
  };
};

export default function AuthenticationIndex() {
  return (
    <div className={"bg-unalink-blue w-screen min-h-screen pt-7 font-poppins"}>
      <div>
        <ul
          className={
            "text-unalink-white font-semibold flex flex-row-reverse gap-4 text-sm mx-4 md:mx-12 lg:text-lg"
          }
        >
          <li className={"font-poppins cursor-pointer"}>English</li>
          <li className={"font-notoSans border-x-[2.5px] px-2 cursor-pointer"}>
            فارسی
          </li>
          <li className={"font-notoSans cursor-pointer"}>العربية</li>
        </ul>
      </div>
      <div
        className={
          "bg-unalink-white mt-7 rounded-[2.143em] w-[89vw] mx-auto overflow-x-hidden px-6 py-12 min-h-[85vh] md:w-[95vw] md:px-12 lg:px-20 lg:py-28 flex flex-col justify-between"
        }
      >
        <div className={"flex flex-row justify-between xl:flex-row-reverse"}>
          <div>
            <span className="text-black font-medium text-xs sm:text-lg xl:text-3xl">
              Welcome to
            </span>
            <h1 className="text-unalink-blue font-black text-sm uppercase sm:text-2xl xl:text-4xl xl:mt-3">
              Unalink Tracking Platform
            </h1>
          </div>
          <img
            src={logoSVG}
            alt="Logo"
            className={"w-1/3 sm:max-w-[13rem] lg:max-w-[18rem]"}
          />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between w-full">
          <img
            src={runningTruckGif}
            alt="Running truck gif"
            className="w-11/12 sm:10/12 sm:max-w-[32rem] sm:mx-auto sm:mt-7 xl:mx-0 lg:max-w-[35rem]"
          />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const url = request.url;
  if (!url.includes("login") && !url.includes("register")) {
    return redirect("/authentication/login");
  }
  if (session.has("email") && session.has("password")) {
    return redirect("/");
  }
  return {};
};
